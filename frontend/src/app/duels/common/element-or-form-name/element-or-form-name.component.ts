import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-or-form-name',
  templateUrl: './element-or-form-name.component.html',
  styleUrls: ['./element-or-form-name.component.less'],
})
export class ElementOrFormNameComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  name = 'Вода';
}
