import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout, setAuthenticated } from './auth.actions';
import { AuthState } from './auth.state';

export const AUTH = 'auth';

export const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, error: null, isLoading: true })),
  on(loginSuccess, (state) => ({ ...state, isLoading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(logout, () => initialState),
  on(setAuthenticated, (state, { isAuthenticated }) => ({ ...state, isAuthenticated }))
);
