import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MaterialModule,
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(),
  ],
})
export class NavbarModule {}
