import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { resultsAction } from '../store/actions/intuition/results.actions';

@Injectable()
export class IntStatEffects {
  constructor(private actions: Actions, private httpService: HttpService) {}

  login = localStorage.getItem('login') || '';

  getResults = createEffect(() =>
    this.actions.pipe(
      ofType(resultsAction.getResults),
      mergeMap(() =>
        this.httpService.getIntuitionResults(this.login).pipe(
          map((result: any) => ({
            type: resultsAction.addResults,
            results: result,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
