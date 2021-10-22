import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromArena from '../app/store/reducers/arena.reducer';
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
    StoreModule.forRoot({ arena: fromArena.reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
