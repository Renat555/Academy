import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AnomalyComponent } from './anomaly/anomaly.component';
import { ArenaHeroComponent } from './arena-hero/arena-hero.component';
import { ArenaComponent } from './arena.component';
import { BattleComponent } from './battle/battle.component';
import { HealthPotionComponent } from './toolbar/health-potion/health-potion.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    AnomalyComponent,
    ArenaHeroComponent,
    BattleComponent,
    ToolbarComponent,
    HealthPotionComponent,
    ArenaComponent,
  ],
  exports: [
    AnomalyComponent,
    ArenaHeroComponent,
    BattleComponent,
    ToolbarComponent,
    HealthPotionComponent,
    ArenaComponent,
  ],
})
export class ArenaModule {}
