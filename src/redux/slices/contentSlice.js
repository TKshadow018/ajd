import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
  events: [],
  manifesto: [],
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setManifesto: (state, action) => {
      state.manifesto = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNews, setEvents, setManifesto, setLoading, setError } =
  contentSlice.actions;

export default contentSlice.reducer;
