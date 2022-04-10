import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { IpConfig } from "src/app/models/config.model";
import { IpService } from "src/app/services/ip.service";
import { AppState } from "../app.state";
import { loadIpConfig, loadIpSuccess, setErrorMessage, setLoadingSpinner } from "./shared.actions";

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private ipService: IpService,
        private store: Store<AppState>
    ) {}

    loadIpInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadIpConfig),
            exhaustMap((action: {ipConfig: IpConfig}) => {
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
}