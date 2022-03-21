import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './arena/battle/battle.component';
import { HealthComponent } from './common/health/health.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducers } from './store';
import { MenuComponent } from './menu/menu.component';
import { HintComponent } from './common/hint/hint.component';
import { IntuitionFiguresComponent } from './intuition/intuition-figures/intuition-figures.component';
import { ScaleComponent } from './common/scale/scale.component';
import { ArenaComponent } from './arena/arena.component';
import { IntuitionComponent } from './intuition/intuition.component';
import { IntuitionMenuComponent } from './intuition/intuition-menu/intuition-menu.component';
import { IntuitionBlackWhiteComponent } from './intuition/intuition-black-white/intuition-black-white.component';
import { ColorsComponent } from './intuition/colors/colors.component';
import { DuelsComponent } from './duels/duels.component';
import { HelpComponent } from './duels/help/help.component';
import { CreateHeroComponent } from './duels/create-hero/create-hero.component';
import { PlayingCardsComponent } from './intuition/playing-cards/playing-cards.component';
import { IntuitionBottomComponent } from './common/intuition-bottom/intuition-bottom.component';
import { CardSuitsComponent } from './intuition/card-suits/card-suits.component';
import { UserDefinedRangeComponent } from './intuition/user-defined-range/user-defined-range.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitScreenComponent } from './duels/wait-screen/wait-screen.component';
import { EffectsComponent } from './duels/effects/effects.component';
import { GameComponent } from './duels/game/game.component';
import { BattlefieldEnemyComponent } from './duels/game/battlefield-enemy/battlefield-enemy.component';
import { BattlefieldUserComponent } from './duels/game/battlefield-user/battlefield-user.component';
import { BattlefieldCentreComponent } from './duels/game/battlefield-centre/battlefield-centre.component';
import { BattlefieldMuveComponent } from './duels/game/battlefield-muve/battlefield-muve.component';
import { ElementOrFormNameComponent } from './duels/common/element-or-form-name/element-or-form-name.component';
import { MapComponent } from './duels/game/battlefield-centre/map/map.component';
import { DescriptionComponent } from './duels/game/battlefield-centre/description/description.component';
import { AuthComponent } from './auth/auth.component';
import { AuthMiniComponent } from './auth/auth-mini/auth-mini.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { PendingComponent } from './common/pending/pending.component';
import { ProfileComponent } from './profile/profile.component';
import { GeneralStatComponent } from './profile/general-stat/general-stat.component';
import { DetailStatComponent } from './profile/detail-stat/detail-stat.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AnomalyComponent } from './arena/anomaly/anomaly.component';
import { ArenaHeroComponent } from './arena/arena-hero/arena-hero.component';
import { ToolbarComponent } from './arena/toolbar/toolbar.component';
import { HealthPotionComponent } from './arena/toolbar/health-potion/health-potion.component';
import { EffectsModule } from '@ngrx/effects';
import { IntStatEffects } from './effects/intStat.effects';

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    ArenaComponent,
    HealthComponent,
    MenuComponent,
    HintComponent,
    IntuitionComponent,
    IntuitionFiguresComponent,
    ScaleComponent,
    IntuitionMenuComponent,
    IntuitionBlackWhiteComponent,
    ColorsComponent,
    DuelsComponent,
    GameComponent,
    HelpComponent,
    CreateHeroComponent,
    PlayingCardsComponent,
    IntuitionBottomComponent,
    CardSuitsComponent,
    UserDefinedRangeComponent,
    WaitScreenComponent,
    EffectsComponent,
    BattlefieldEnemyComponent,
    BattlefieldUserComponent,
    BattlefieldCentreComponent,
    BattlefieldMuveComponent,
    ElementOrFormNameComponent,
    MapComponent,
    DescriptionComponent,
    AuthComponent,
    AuthMiniComponent,
    AuthorizationComponent,
    RegistrationComponent,
    PendingComponent,
    ProfileComponent,
    GeneralStatComponent,
    DetailStatComponent,
    AnomalyComponent,
    ArenaHeroComponent,
    ToolbarComponent,
    HealthPotionComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    FormsModule,
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
