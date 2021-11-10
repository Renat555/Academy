import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';
import { LossComponent } from './arena/loss/loss.component';
import { WinComponent } from './arena/win/win.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
