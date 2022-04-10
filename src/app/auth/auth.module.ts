import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { initialState } from '../store/shared/shared.state';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    EffectsModule.forFeature(),
    TranslateModule.forChild({
      defaultLanguage: initialState.languageConfig.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
})
export class AuthModule {}
