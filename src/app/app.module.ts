import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { AuthTokenInterceptor } from './services/auth.token.interceptor';
import { environment } from 'src/environments/environment';
import { appReducer, AppState } from './store/app.state';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { navbarReducer } from './shared/components/navbar/state/navbar.reducer';
import { initialState } from './shared/components/navbar/state/navbar.state';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: initialState.language,
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
