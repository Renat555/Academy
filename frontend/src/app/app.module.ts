import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducers } from './store';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { AuthMiniComponent } from './auth/auth-mini/auth-mini.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { GeneralStatComponent } from './profile/general-stat/general-stat.component';
import { DetailStatComponent } from './profile/detail-stat/detail-stat.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { IntStatEffects } from './effects/intStat.effects';
import { IntuitiotionModule } from './intuition/intuition.module';
import { SharedModule } from './shared.module';
import { DuelsModule } from './duels/duels.module';
import { ArenaModule } from './arena/arena.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    AuthMiniComponent,
    AuthorizationComponent,
    RegistrationComponent,
    ProfileComponent,
    GeneralStatComponent,
    DetailStatComponent,
  ],
  imports: [
    ArenaModule,
    IntuitiotionModule,
    SharedModule,
    DuelsModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    EffectsModule.forRoot([IntStatEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  providers: [
    authGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
