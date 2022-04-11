import { LanguageConfig } from "src/app/models/config.model";
import { IpInfoResponse } from "src/app/models/ip.info.response.data";

export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
  isDarkThemeEnabled: boolean;
  ipInfo: IpInfoResponse | null;
  languageConfig: LanguageConfig;
  currentLanguage: string;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
  isDarkThemeEnabled: false,
  ipInfo: null,
  languageConfig: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'ro']
  },
  currentLanguage: 'en'
};
