export interface NavbarState {
    isDarkThemeEnabled: boolean;
    language: string;
}

export const initialState: NavbarState = {
    isDarkThemeEnabled: false,
    language: 'en'
};