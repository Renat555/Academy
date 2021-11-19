import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './arena/game/game.component';
import { HealthComponent } from './common/health/health.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { WinComponent } from './arena/win/win.component';
import { LossComponent } from './arena/loss/loss.component';
import { HallComponent } from './hall/hall.component';
import { HintComponent } from './common/hint/hint.component';
import { IntuitionFiguresComponent } from './intuition/intuitionFigures/intuitionFigures.component';
import { ScaleComponent } from './common/scale/scale.component';
import { ArenaComponent } from './arena/arena.component';
import { IntuitionComponent } from './intuition/intuition.component';
import { IntuitionMenuComponent } from './intuition/intuition-menu/intuition-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ArenaComponent,
    HealthComponent,
    WinComponent,
    LossComponent,
    HallComponent,
    HintComponent,
    IntuitionComponent,
    IntuitionFiguresComponent,
    ScaleComponent,
    IntuitionMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
