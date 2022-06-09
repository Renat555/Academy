import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardSuitsComponent } from './card-suits/card-suits.component';
import { ColorsComponent } from './colors/colors.component';
import { BlackWhiteComponent } from './black-white/black-white.component';
import { IntuitionComponent } from './intuition.component';
import { FiguresComponent } from './figures/figures.component';
import { IntuitionMenuComponent } from './intuition-menu/intuition-menu.component';
import { PlayingCardsComponent } from './playing-cards/playing-cards.component';
import { UserDefinedRangeComponent } from './user-defined-range/user-defined-range.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    IntuitionComponent,
    CardSuitsComponent,
    ColorsComponent,
    BlackWhiteComponent,
    FiguresComponent,
    IntuitionMenuComponent,
    PlayingCardsComponent,
    UserDefinedRangeComponent,
  ],
  exports: [
    IntuitionComponent,
    CardSuitsComponent,
    ColorsComponent,
    BlackWhiteComponent,
    FiguresComponent,
    IntuitionMenuComponent,
    PlayingCardsComponent,
    UserDefinedRangeComponent,
  ],
})
export class IntuitiotionModule {}
