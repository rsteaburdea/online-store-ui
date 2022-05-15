import {
  setLoadingSpinner,
  setErrorMessage,
} from './../../store/shared/shared.actions';
import { AuthService } from './../../services/auth.service';
import { exhaustMap, map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  googleLoginStart,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
  updateGoogleToken,
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  googleLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(googleLoginStart),
      exhaustMap(() => {
        return from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
          map((socialUser: SocialUser) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatSocialUser(socialUser);
            this.authService.setUserInLocalStorage(user);
            this.authService.getUserAuthorities();
            this.store.dispatch(loginSuccess({user, redirect: true}));
            return updateGoogleToken();
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        )
      })
    )
  });

  updateGoogleToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateGoogleToken),
      exhaustMap(() => {
        return this.socialAuthService.authState.pipe(
          map((socialUser: SocialUser) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatSocialUser(socialUser);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({user, redirect: false});
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        )
      })
    )
  })

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
