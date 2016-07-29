import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';

import { LoginActions, TextItemActions } from '../actions';
import { TextItem } from '../models';
import { AngularFire, AuthMethods,
  AuthProviders, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class TextItemEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private textItemActions: TextItemActions,
    public af: AngularFire

  ) { }

  /**
   * Effects offer a way to isolate and easily test side-effects within your
   * application. StateUpdates is an observable of the latest state and
   * dispatched action. The `toPayload` helper function returns just
   * the payload of the currently dispatched action, useful in
   * instances where the current state is not necessary.
   *
   * If you are unfamiliar with the operators being used in these examples, please
   * check out the sources below:
   *
   * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
   * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
   */
  @Effect() loadCollection$ = this.updates$
    .whenAction(TextItemActions.LOAD_COLLECTION)
    .do(x => { console.log('Effect:loadCollection$:A', x); })

    .filter(x => x.state.login.isAuthenticated)
    // Watch database node and get TextItems.
    .switchMap(x => this.af.database.list('/textItems'))
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((textItems: TextItem[]) => this.textItemActions.loadCollectionSuccess(textItems));
  // Terminate effect.
  // .filter(() => false);
}
