import { createAction, props } from '@ngrx/store';

export const SWITCH_DARK_THEME = '[navbar] switch dark theme';
export const CHANGE_LANGUAGE = '[navbar] switch language'

export const switchDarkTheme = createAction(
    SWITCH_DARK_THEME,
    props<{ isDarkThemeEnabled: boolean }>()
);

export const changeLanguage = createAction(
    CHANGE_LANGUAGE,
    props<{ language: string }>()
);