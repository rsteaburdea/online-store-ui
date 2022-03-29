import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { changeLanguage, switchDarkTheme } from "./navbar.actions";
import { initialState, NavbarState } from "./navbar.state";

const _navbarReducer = createReducer(
    initialState,
    on(switchDarkTheme, (state) => {
        return {
            ...state,
            isDarkThemeEnabled: !state.isDarkThemeEnabled
        }
    }),
    on(changeLanguage, (state, action) => {
        return {
            ...state,
            language: action.language
        };
    })
)

export function navbarReducer(state: NavbarState | undefined, action: Action) {
    return _navbarReducer(state, action);
}