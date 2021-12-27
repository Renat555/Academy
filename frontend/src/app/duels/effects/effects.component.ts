import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.less'],
})
export class EffectsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  userEffects = ['fireshild', 'firecrown'];
  enemyEffects = ['watershild'];
}
