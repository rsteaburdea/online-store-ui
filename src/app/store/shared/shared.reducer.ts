import { setLoadingSpinner, setErrorMessage, switchDarkTheme, loadIpInfoSuccess } from './shared.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(switchDarkTheme, (state) => {
    return {
      ...state,
      isDarkThemeEnabled: !state.isDarkThemeEnabled
    }
  }),
  on(loadIpInfoSuccess, (state, action) => {
    return {
      ...state,
      ipInfo: action.ipInfoResponse
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
