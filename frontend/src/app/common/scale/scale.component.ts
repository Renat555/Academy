import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.less'],
})
export class ScaleComponent implements OnInit {
  @Input() percentRightAnswers?: number;
  constructor() {}

  ngOnInit(): void {}
}
