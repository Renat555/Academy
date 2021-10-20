import { reducers } from './store/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { HealthComponent } from './health/health.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, ArenaComponent, HealthComponent],
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
