import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.less'],
})
export class HealthComponent {
  @Input() health?: string;

  constructor() {}
}
