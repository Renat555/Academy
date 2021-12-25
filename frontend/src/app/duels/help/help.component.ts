import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less'],
})
export class HelpComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCreateHero() {
    this.router.navigate(['duels/createHero']);
  }
}
