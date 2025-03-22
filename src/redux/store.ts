import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import eegStateSlice from "./features/eegStateSlice";


const globalState = combineReducers(
  {
    appStateSlice,
    eegStateSlice
  })

export const store = configureStore({
  reducer: globalState
});

export type RootState = ReturnType<typeof store.getState>;