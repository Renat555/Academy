import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less'],
})
export class MessageComponent {
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
