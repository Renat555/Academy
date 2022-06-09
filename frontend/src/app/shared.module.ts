import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AudioComponent } from './common/audio/audio.component';
import { HealthComponent } from './common/health/health.component';
import { IntuitionBottomComponent } from './common/intuition-bottom/intuition-bottom.component';
import { MessageComponent } from './common/message/message.component';
import { PendingComponent } from './common/pending/pending.component';
import { ScaleComponent } from './common/scale/scale.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  declarations: [
    AudioComponent,
    IntuitionBottomComponent,
    HealthComponent,
    MessageComponent,
    PendingComponent,
    ScaleComponent,
  ],
  exports: [
    AudioComponent,
    IntuitionBottomComponent,
    FormsModule,
    ReactiveFormsModule,
    HealthComponent,
    MessageComponent,
    PendingComponent,
    ScaleComponent,
    AppRoutingModule,
  ],
})
export class SharedModule {}
