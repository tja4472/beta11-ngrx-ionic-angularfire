import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState, LoginState } from '../reducers';

export function getLoginState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.login);
}

export function getLoginIsAuthorized() {
  return compose(_getIsAuthenticated, getLoginState());
}

function _getIsAuthenticated() {
    return (state$: Observable<LoginState>) => state$
        .select(s => s.isAuthenticated);
}