import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-mini',
  templateUrl: './auth-mini.component.html',
  styleUrls: ['./auth-mini.component.less'],
})
export class AuthMiniComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  userName = '';
  isAuthorized = false;

  goToAuthorization() {
    this.router.navigate(['auth/authorization']);
  }

  goToRegistration() {
    this.router.navigate(['auth/registration']);
  }
}
