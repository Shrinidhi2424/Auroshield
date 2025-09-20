import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunks for Firebase auth operations
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async () => {
    await signInWithRedirect(auth, googleProvider);
    // The actual user will be set when handleRedirectResult is called
    return null;
  }
);

export const handleRedirectResult = createAsyncThunk(
  'auth/handleRedirectResult',
  async () => {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await signOut(auth);
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in with email
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sign in';
      })
      // Sign up with email
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sign up';
      })
      // Google sign in
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sign in with Google';
      })
      // Handle redirect result
      .addCase(handleRedirectResult.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
