import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/material.module';
import { NavbarRoutingModule } from './navbar-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { CountrySelectorComponent } from './navbar/country-selector/country-selector.component';
import { initialState } from 'src/app/store/shared/shared.state';


@NgModule({
  declarations: [NavbarComponent, CountrySelectorComponent],
  imports: [
    MaterialModule,
    CommonModule,
    NavbarRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(),
    TranslateModule.forChild({
      defaultLanguage: initialState.languageConfig.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
})
export class NavbarModule {}
