import { combineReducers } from '@reduxjs/toolkit';
import {registerSlice} from './registerSlice';

const rootReducer = combineReducers({
  register: registerSlice,
});

export default rootReducer;