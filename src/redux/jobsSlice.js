import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  favorites: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (job) => job.id !== action.payload
      );
    },
  },
});

export const { setJobs, setLoading, setError, addFavorite, removeFavorite } =
  jobsSlice.actions;

export default jobsSlice.reducer;
