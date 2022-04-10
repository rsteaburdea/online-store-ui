import { IpInfoResponse } from "src/app/models/ip.info.response.data";

export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
  isDarkThemeEnabled: boolean;
  ipInfo: IpInfoResponse | null;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
  isDarkThemeEnabled: false,
  ipInfo: null,
};
