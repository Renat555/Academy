import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intuition-menu',
  templateUrl: './intuition-menu.component.html',
  styleUrls: ['./intuition-menu.component.less'],
})
export class IntuitionMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToFigures() {
    this.router.navigate(['intuition/intuitionFigures']);
  }

  goToBlackWhite() {
    this.router.navigate(['intuition/intuitionBlackWhite']);
  }

  goToHall() {
    this.router.navigate(['']);
  }
}
