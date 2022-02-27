import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.less'],
})
export class HintComponent {
  constructor() {
    this.isCross = false;
  }
  @Input() text?: string;
  @Input() isCross: boolean;

  @Output() closeHint: EventEmitter<any> = new EventEmitter();

  hideHint() {
    this.closeHint.emit();
  }
}
