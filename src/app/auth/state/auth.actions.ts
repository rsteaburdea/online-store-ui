import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN_START = '[AUTH] login start';
export const LOGIN_SUCCESS = '[AUTH] login Success';
export const LOGIN_FAIL = '[AUTH] login Fail';
export const AUTO_LOGIN_ACTION = '[AUTH] auto login';

export const GOOGLE_LOGIN_START = '[AUTH] google login start';
export const GOOGLE_LOGIN_SUCCESS = '[AUTH] google login success';
export const GOOGLE_LOGIN_FAIL = '[AUTH] google login fail';
export const GOOGLE_LOGIN_UPDATE_TOKEN = '[AUTH] google update token'

export const SIGNUP_START = '[AUTH] signup start';
export const SIGNUP_SUCCESS = '[AUTH] signup success';

export const LOGOUT_ACTION = '[AUTH] logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null; redirect: boolean }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);

export const googleLoginStart = createAction(GOOGLE_LOGIN_START);
export const updateGoogleToken = createAction(GOOGLE_LOGIN_UPDATE_TOKEN);