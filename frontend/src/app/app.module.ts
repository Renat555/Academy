import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './arena/game/game.component';
import { HealthComponent } from './common/health/health.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './store';
import { WinComponent } from './arena/win/win.component';
import { LossComponent } from './arena/loss/loss.component';
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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ArenaComponent,
    HealthComponent,
    WinComponent,
    LossComponent,
    MenuComponent,
    HintComponent,
    IntuitionComponent,
    IntuitionFiguresComponent,
    ScaleComponent,
    IntuitionMenuComponent,
    IntuitionBlackWhiteComponent,
    ColorsComponent,
    DuelsComponent,
    HelpComponent,
    CreateHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
