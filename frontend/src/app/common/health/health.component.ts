import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.less'],
})
export class HealthComponent {
  @Input() health?: string;

  constructor(private store: Store<AppState>) {}
}
