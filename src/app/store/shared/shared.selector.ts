import { SharedState } from './shared.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => {
  return state.showLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});

export const isDarkThemeEnabled = createSelector(getSharedState, (state) => {
  return state.isDarkThemeEnabled;
})

export const getIpInfo = createSelector(getSharedState, (state) => {
  return state.ipInfo;
})

export const getCurrentLanguage = createSelector(getSharedState, (state) => {
  if (state.ipInfo && 
      state.languageConfig.availableLanguages
        .indexOf(state.ipInfo.location.language.code.toLowerCase()) !== -1) {
    return state.ipInfo.location.language.code.toLowerCase();
  }
  return state.languageConfig.defaultLanguage;
})

export const getDefaultLanguage = createSelector(getSharedState, (state) => {
  return state.languageConfig.defaultLanguage;
})

export const getAvailableLanguages = createSelector(getSharedState, (state) => {
  return state.languageConfig.availableLanguages;
})
