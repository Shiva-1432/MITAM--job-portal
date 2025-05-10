import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  jobs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
}); 