import {createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {EegMember} from "../../model/eeg.model";
import {RootState} from "../store";

interface eegState {
  eegSlice: EntityState<EegMember>;
  selectedEeg: EegMember | null;
}

export const eegAdapter = createEntityAdapter<EegMember>({
  selectId: (eeg) => eeg.tenant
});

const initialState: eegState = {
  eegSlice: eegAdapter.getInitialState(),
  selectedEeg: null
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
    }
  }
});

export const {
  setEegAll,
  setSelectedEeg,
} = eegStateSlice.actions;

export default eegStateSlice.reducer;


const eegSelector = (store: RootState) => (store.eegStateSlice)

export const selectedEeg = createSelector(
  eegSelector,
  eegSlice => eegSlice.selectedEeg
)