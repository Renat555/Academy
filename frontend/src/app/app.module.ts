import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { HealthComponent } from './health/health.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { WinComponent } from './arena/win/win.component';
import { LossComponent } from './arena/loss/loss.component';
import { HallComponent } from './hall/hall.component';
import { HintComponent } from './common/hint/hint.component';
import { IntuitionComponent } from './intuition/intuition.component';


@NgModule({
  declarations: [AppComponent, ArenaComponent, HealthComponent, WinComponent, LossComponent, HallComponent, HintComponent, IntuitionComponent],
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
