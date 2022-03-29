import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NavbarState } from "./navbar.state";

export const NAVBAR_STATE_NAME = 'navbar';

const getNavbarState = createFeatureSelector<NavbarState>(NAVBAR_STATE_NAME);

export const isDarkThemeEnabled = createSelector(getNavbarState, (state) => {
    return state.isDarkThemeEnabled;
})

export const getLanguage = createSelector(getNavbarState, (state) => {
    return state.language;
})