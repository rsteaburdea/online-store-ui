import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { of, switchMap } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { IpConfig } from "src/app/models/config.model";
import { IpService } from "src/app/services/ip.service";
import { AppState } from "../app.state";
import { loadIpConfig, loadIpSuccess, setErrorMessage, setLoadingSpinner, updateCurrentLanguage } from "./shared.actions";
import { getAvailableLanguages, getDefaultLanguage } from "./shared.selector";

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private ipService: IpService,
        private store: Store<AppState>,
        private translateService: TranslateService
    ) { }

    loadIp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadIpConfig),
            exhaustMap((action: { ipConfig: IpConfig }) => {
                return this.ipService.getIpDetails(action.ipConfig).pipe(
                    map((ipCompleteInfo) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const ipInfoResponse = this.ipService.formatIpInfoResponse(ipCompleteInfo);
                        return loadIpSuccess({ ipInfoResponse });
                    }),
                    catchError(() => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        return of(setErrorMessage({ message: 'Unknown error occurred. Please try again' }));
                    })
                )
            })
        )
    })

    loadIpSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadIpSuccess),
            map((action) => {
                return action.ipInfoResponse?.location.language.code;
            }),
            switchMap((language) => 
                this.store.select(getDefaultLanguage)
                    .pipe(
                        map((defaultLanguage) => {
                            language ??= defaultLanguage;
                            return updateCurrentLanguage({ language });
                        })
                    )
            )
        )
    })

    updateTranslateServiceLanguage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateCurrentLanguage),
                switchMap((action) =>
                    this.store.select(getAvailableLanguages)
                        .pipe(
                            map(array => {
                                let language = array.filter(value => value === action.language)
                                return (language.length > 0) ? language[0] : null;
                            })
                        )
                ),
                switchMap((language) =>
                    this.store.select(getDefaultLanguage)
                        .pipe(
                            map(defaultLanguage => {
                                language ??= defaultLanguage
                                this.translateService.setDefaultLang(language);
                                this.translateService.use(language);
                                return language;
                            })
                        )
                )
            ), { dispatch: false })
}