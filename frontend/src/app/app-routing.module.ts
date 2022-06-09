import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';
import { BattleComponent } from './arena/battle/battle.component';
import { GameComponent } from './duels/game/game.component';
import { MenuComponent } from './menu/menu.component';
import { IntuitionMenuComponent } from './intuition/intuition-menu/intuition-menu.component';
import { IntuitionComponent } from './intuition/intuition.component';
import { FiguresComponent } from './intuition/figures/figures.component';
import { BlackWhiteComponent } from './intuition/black-white/black-white.component';
import { ColorsComponent } from './intuition/colors/colors.component';
import { DuelsComponent } from './duels/duels.component';
import { CreateHeroComponent } from './duels/create-hero/create-hero.component';
import { HelpComponent } from './duels/help/help.component';
import { PlayingCardsComponent } from './intuition/playing-cards/playing-cards.component';
import { CardSuitsComponent } from './intuition/card-suits/card-suits.component';
import { UserDefinedRangeComponent } from './intuition/user-defined-range/user-defined-range.component';
import { WaitScreenComponent } from './duels/wait-screen/wait-screen.component';
import { AuthComponent } from './auth/auth.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { GeneralStatComponent } from './profile/general-stat/general-stat.component';
import { DetailStatComponent } from './profile/detail-stat/detail-stat.component';

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
        component: FiguresComponent,
      },
      {
        path: 'blackWhite',
        component: BlackWhiteComponent,
      },
      {
        path: 'colors',
        component: ColorsComponent,
      },
      {
        path: 'playingCards',
        component: PlayingCardsComponent,
      },
      {
        path: 'cardSuits',
        component: CardSuitsComponent,
      },
      {
        path: 'userDefinedRanged',
        component: UserDefinedRangeComponent,
      },
    ],
  },
  {
    path: 'arena',
    component: ArenaComponent,
    children: [
      {
        path: 'game',
        component: BattleComponent,
      },
    ],
  },
  {
    path: 'duels',
    component: DuelsComponent,
    children: [
      {
        path: 'createHero',
        component: CreateHeroComponent,
      },
      {
        path: 'game',
        component: GameComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
      {
        path: 'wait',
        component: WaitScreenComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'authorization',
        component: AuthorizationComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'generalStat',
        component: GeneralStatComponent,
      },
      {
        path: 'detailStat',
        component: DetailStatComponent,
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
