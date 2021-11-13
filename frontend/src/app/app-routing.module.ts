import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';
import { LossComponent } from './arena/loss/loss.component';
import { WinComponent } from './arena/win/win.component';
import { HallComponent } from './hall/hall.component';

const routes: Routes = [
  {
    path: 'arena',
    component: ArenaComponent,
  },
  {
    path: 'win',
    component: WinComponent,
  },
  {
    path: 'loss',
    component: LossComponent,
  },
  {
    path: '',
    component: HallComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
