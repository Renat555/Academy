import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-duels-health',
  templateUrl: './duels-health.component.html',
  styleUrls: ['./duels-health.component.less'],
})
export class DuelsHealthComponent implements OnChanges {
  constructor() {}

  @Input() health!: number;
  @Input() maxHealth!: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.healthPercent = (100 * this.health) / this.maxHealth;
  }

  healthPercent = 0;
}
