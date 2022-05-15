import { loginSuccess, signupSuccess, autoLogout, googleLoginSuccess } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(googleLoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  })
);

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
