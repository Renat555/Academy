import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';
import { GameComponent } from './arena/game/game.component';
import { LossComponent } from './arena/loss/loss.component';
import { WinComponent } from './arena/win/win.component';
import { HallComponent } from './hall/hall.component';
import { IntuitionMenuComponent } from './intuition/intuition-menu/intuition-menu.component';
import { IntuitionComponent } from './intuition/intuition.component';
import { IntuitionFiguresComponent } from './intuition/intuitionFigures/intuitionFigures.component';

const routes: Routes = [
  {
    path: '',
    component: HallComponent,
  },
  {
    path: 'intuition',
    component: IntuitionComponent,
    children: [
      {
        path: 'intuitionMenu',
        component: IntuitionMenuComponent,
      },
      {
        path: 'intuitionFigures',
        component: IntuitionFiguresComponent,
      },
    ],
  },
  {
    path: 'arena',
    component: ArenaComponent,
    children: [
      {
        path: 'game',
        component: GameComponent,
      },
      {
        path: 'win',
        component: WinComponent,
      },
      {
        path: 'loss',
        component: LossComponent,
      },
    ],
  },
  {
    path: '**',
    component: HallComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
