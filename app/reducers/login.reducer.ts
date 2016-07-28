import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginActions } from '../actions';
import { FirebaseAuthState } from 'angularfire2';

export interface LoginState {
    displayName: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: any;
};

const initialState: LoginState = {
    displayName: '',
    isAuthenticated: false,
    isAuthenticating: false,
    error: null
};

export default function (state = initialState, action: Action): LoginState {
    switch (action.type) {
/*
        case LoginActions.LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                error: null,
                displayName: action.payload,
                isAuthenticated: true,
                isAuthenticating: false
            });
        }
*/
        case LoginActions.GOOGLE_AUTHENTICATION : {
            return Object.assign({}, state, {
                isAuthenticating: true
            });
        }

        case LoginActions.ANONYMOUS_AUTHENTICATION_SUCCESS:
        case LoginActions.CREATE_USER_SUCCESS:  
        case LoginActions.EMAIL_AUTHENTICATION_SUCCESS:
        case LoginActions.GOOGLE_AUTHENTICATION_SUCCESS:
        case LoginActions.RESTORE_AUTHENTICATION: {
            let user: FirebaseAuthState = action.payload;

            return Object.assign({}, state, {
                displayName: getDisplayName(user),                
                isAuthenticated: true,
                isAuthenticating: false
            });
        }

        case LoginActions.LOGOUT: {
            return Object.assign({}, state, {
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false
            });
        }

        case LoginActions.ANONYMOUS_AUTHENTICATION:
        case LoginActions.CREATE_USER:        
        case LoginActions.EMAIL_AUTHENTICATION: {
            return Object.assign({}, state, {
                error: null,
                isAuthenticating: true
            });
        }

        case LoginActions.ANONYMOUS_AUTHENTICATION_FAILURE:
        case LoginActions.CREATE_USER_FAILURE:        
        case LoginActions.EMAIL_AUTHENTICATION_FAILURE: {
            return Object.assign({}, state, {
                error: action.payload,
                isAuthenticating: false
            }); 
        }

/*
        case LoginActions.ANONYMOUS_AUTHENTICATION_SUCCESS: {
            let user: FirebaseAuthState = action.payload;

            return Object.assign({}, state, {
                error: null,
                displayName: 'Anonymous',
                isAuthenticated: true,
                isAuthenticating: false
            });
        } 
*/
/*
        case LoginActions.CREATE_USER_SUCCESS:  
        case LoginActions.EMAIL_AUTHENTICATION_SUCCESS: {
            let user: FirebaseAuthState = action.payload;

            return Object.assign({}, state, {
                error: null,
                displayName: user.auth.email,
                isAuthenticated: true,
                isAuthenticating: false
            });
        }        
*/
        default: {
            return state;
        }
    }
}

export function getIsAuthenticated() {
    return (state$: Observable<LoginState>) => state$
        .select(s => s.isAuthenticated);
}

function getDisplayName(user: FirebaseAuthState) {
    if (user.auth.isAnonymous) return 'Anonymous';

    if (user.auth.displayName) return user.auth.displayName;

    if (user.auth.email) return user.auth.email;
    return '';
}
