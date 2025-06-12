import {createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {EegMember, EegParticipant} from "../../model/eeg.model";
import {RootState} from "../store";

interface eegState {
  eegSlice: EntityState<EegMember>;
  selectedEeg: EegMember | null;
  eegParticipants: EntityState<EegParticipant>
}

export const eegAdapter = createEntityAdapter<EegMember>({
  selectId: (eeg) => eeg.tenant
});

export const eegParticipantAdapter = createEntityAdapter<EegParticipant>({
  selectId: (participant) => participant.id
});

const initialState: eegState = {
  eegSlice: eegAdapter.getInitialState(),
  selectedEeg: null,
  eegParticipants: eegParticipantAdapter.getInitialState(),
};

export const eegStateSlice = createSlice({
  name: "eegState",
  initialState,
  reducers: {
    setEegAll: (state, action: PayloadAction<EegMember[]>) => {
      eegAdapter.setAll(state.eegSlice, action.payload);
    },
    setSelectedEeg: (state, action: PayloadAction<EegMember>) => {
      state.selectedEeg = action.payload
    },
    setEegParticipants: (state, action: PayloadAction<EegParticipant[]>) => {
      eegParticipantAdapter.setAll(state.eegParticipants, action.payload);
    },

    updateEegByTenant: (state, action: PayloadAction<EegMember>) => {
      eegAdapter.updateOne(state.eegSlice, {id: action.payload.tenant,  changes: action.payload});
      // state.selectedEeg = action.payload;
    }
  }
});

export const {
  setEegAll,
  setSelectedEeg,
  setEegParticipants,
  updateEegByTenant,
} = eegStateSlice.actions;

export default eegStateSlice.reducer;

const {selectAll, selectById, selectEntities} = eegAdapter.getSelectors();

const eegSelector = (store: RootState) => (store.eegStateSlice)

export const selectedEeg = createSelector(
  eegSelector,
  eegSlice => eegSlice.selectedEeg
)

export const allEegs = createSelector(
  eegSelector,
  eegSlice => selectAll(eegSlice.eegSlice)
)

export const eegParticipants = createSelector(
  eegSelector,
  eegSlice => eegSlice.eegParticipants,
)