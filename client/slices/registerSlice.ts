import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (formData: { username: string; email: string; password: string }) => {
    const response = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export default registerSlice.reducer;