import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(),
  ],
})
export class AuthModule {}
