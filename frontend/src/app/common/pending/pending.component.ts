import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.less'],
})
export class PendingComponent implements OnInit {
  @Input() text?: string;

  constructor() {}

  ngOnInit(): void {}
}
