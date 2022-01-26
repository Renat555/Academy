import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserIsAuth } from './store/selectors/user.selectors';
import { AppState } from './store/state/app.state';

@Injectable()
export class authGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let result = false;
    this.store.select(selectUserIsAuth).subscribe((state) => {
      result = !state;
    });
    return result;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }
}
