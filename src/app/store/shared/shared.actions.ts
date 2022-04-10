import { createAction, props } from '@ngrx/store';
import { IpInfoConfig } from 'src/app/models/ip.info.config.model';
import { IpInfoResponse } from 'src/app/models/ip.info.response.data';

export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const SWITCH_DARK_THEME = '[shared state] switch dark theme';

export const LOAD_IP_INFO = '[shared state] load ip info'
export const LOAD_IP_INFO_SUCCESS = '[shared state] load ip info success'

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const switchDarkTheme = createAction(SWITCH_DARK_THEME);

export const loadIpInfo = createAction(
  LOAD_IP_INFO,
  props<{ ipInfoConfig: IpInfoConfig }>()
);

export const loadIpInfoSuccess = createAction(
    LOAD_IP_INFO_SUCCESS,
    props<{ ipInfoResponse: IpInfoResponse | null }>()
);
