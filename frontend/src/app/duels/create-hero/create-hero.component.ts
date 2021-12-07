import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.less'],
})
export class CreateHeroComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToHall() {
    this.router.navigate(['']);
  }
}
