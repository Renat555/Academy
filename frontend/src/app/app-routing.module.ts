import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';
import { GameComponent } from './arena/game/game.component';
import { LossComponent } from './arena/loss/loss.component';
import { WinComponent } from './arena/win/win.component';
import { MenuComponent } from './menu/menu.component';
import { IntuitionMenuComponent } from './intuition/intuition-menu/intuition-menu.component';
import { IntuitionComponent } from './intuition/intuition.component';
import { IntuitionFiguresComponent } from './intuition/intuition-figures/intuition-figures.component';
import { IntuitionBlackWhiteComponent } from './intuition/intuition-black-white/intuition-black-white.component';
import { ColorsComponent } from './intuition/colors/colors.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'intuition',
    component: IntuitionComponent,
    children: [
      {
        path: 'menu',
        component: IntuitionMenuComponent,
      },
      {
        path: 'figures',
        component: IntuitionFiguresComponent,
      },
      {
        path: 'blackWhite',
        component: IntuitionBlackWhiteComponent,
      },
      {
        path: 'colors',
        component: ColorsComponent,
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
    component: MenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
