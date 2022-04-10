import { createAction, props } from '@ngrx/store';
import { IpConfig, LanguageConfig } from 'src/app/models/config.model';
import { IpInfoResponse } from 'src/app/models/ip.info.response.data';

export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const SWITCH_DARK_THEME = '[shared state] switch dark theme';

export const LOAD_LANGUAGE_CONFIG = '[shared state] load language config';
export const LOAD_IP_CONFIG = '[shared state] load ip config'
export const LOAD_IP_SUCCESS = '[shared state] load ip details success';
export const UPDATE_CURRENT_LANGUAGE = '[shared state] update current language';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const switchDarkTheme = createAction(SWITCH_DARK_THEME);

export const loadLanguageConfig = createAction(
  LOAD_LANGUAGE_CONFIG,
  props<{ languageConfig: LanguageConfig }>()
);

export const loadIpConfig = createAction(
  LOAD_IP_CONFIG,
  props<{ ipConfig: IpConfig }>()
);

export const loadIpSuccess = createAction(
    LOAD_IP_SUCCESS,
    props<{ ipInfoResponse: IpInfoResponse | null }>()
);

export const updateCurrentLanguage = createAction(
  UPDATE_CURRENT_LANGUAGE,
  props<{ language: string }>()
);