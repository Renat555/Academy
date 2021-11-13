import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.less'],
})
export class HintComponent {
  constructor() {}
  @Input() text?: string;
}
