import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DuelsHealthComponent } from './common/duels-health/duels-health.component';
import { ElementOrFormNameComponent } from './common/element-or-form-name/element-or-form-name.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { DuelsComponent } from './duels.component';
import { EffectsComponent } from './effects/effects.component';
import { BattlefieldCentreComponent } from './game/battlefield-centre/battlefield-centre.component';
import { DescriptionComponent } from './game/battlefield-centre/description/description.component';
import { MapComponent } from './game/battlefield-centre/map/map.component';
import { BattlefieldEnemyComponent } from './game/battlefield-enemy/battlefield-enemy.component';
import { BattlefieldMuveComponent } from './game/battlefield-muve/battlefield-muve.component';
import { BattlefieldUserComponent } from './game/battlefield-user/battlefield-user.component';
import { GameComponent } from './game/game.component';
import { HelpComponent } from './help/help.component';
import { WaitScreenComponent } from './wait-screen/wait-screen.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    DuelsHealthComponent,
    ElementOrFormNameComponent,
    CreateHeroComponent,
    EffectsComponent,
    GameComponent,
    HelpComponent,
    WaitScreenComponent,
    DuelsComponent,
    BattlefieldCentreComponent,
    BattlefieldEnemyComponent,
    BattlefieldMuveComponent,
    BattlefieldUserComponent,
    DescriptionComponent,
    MapComponent,
  ],
  exports: [
    DuelsHealthComponent,
    ElementOrFormNameComponent,
    CreateHeroComponent,
    EffectsComponent,
    GameComponent,
    HelpComponent,
    WaitScreenComponent,
    DuelsComponent,
    BattlefieldCentreComponent,
    BattlefieldEnemyComponent,
    BattlefieldMuveComponent,
    BattlefieldUserComponent,
    DescriptionComponent,
    MapComponent,
  ],
})
export class DuelsModule {}
