import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, withLatestFrom, concatMap, tap, switchMap, mergeMap} from "rxjs/operators";
import { IpInfoConfig } from "src/app/models/ip.info.config.model";
import { IpService } from "src/app/services/ip.service";
import { AppState } from "../app.state";
import { loadIpInfo, loadIpInfoSuccess, setErrorMessage, setLoadingSpinner } from "./shared.actions";

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private ipService: IpService,
        private store: Store<AppState>
    ) {}

    loadIpInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadIpInfo),
            mergeMap((action: {ipInfoConfig: IpInfoConfig}) => {
                return this.ipService.getIpDetails(action.ipInfoConfig).pipe(
                    map((ipInfoResponse) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        // const ipInfo = this.ipService.formatUser(data);
                        return loadIpInfoSuccess({ ipInfoResponse });
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