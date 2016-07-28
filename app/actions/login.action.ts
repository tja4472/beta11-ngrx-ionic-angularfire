import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class LoginActions {
    static ANONYMOUS_AUTHENTICATION = '[Login] Anonymous Authentication';
    anonymousAuthentication(): Action {
        return {
            type: LoginActions.ANONYMOUS_AUTHENTICATION
        };
    }

    static ANONYMOUS_AUTHENTICATION_SUCCESS = '[Login] Anonymous Authentication Success';
    anonymousAuthenticationSuccess(user: FirebaseAuthState): Action {
        return {
            type: LoginActions.ANONYMOUS_AUTHENTICATION_SUCCESS,
            payload: user
        };
    }

    static ANONYMOUS_AUTHENTICATION_FAILURE = '[Login] Anonymous Authentication Failure';
    anonymousAuthenticationFailure(error): Action {
        return {
            type: LoginActions.ANONYMOUS_AUTHENTICATION_FAILURE,
            payload: error
        };
    }

    static CREATE_USER = '[Login] Create User';
    createUser(userName: string, password: string): Action {
        return {
            type: LoginActions.CREATE_USER,
            payload: {
                userName: userName,
                password: password
            }
        };
    }

    static CREATE_USER_SUCCESS = '[Login] Create User Success';
    createUserSuccess(user: FirebaseAuthState): Action {
        return {
            type: LoginActions.CREATE_USER_SUCCESS,
            payload: user
        };
    }

    static CREATE_USER_FAILURE = '[Login] Create User Failure';
    createUserFailure(error): Action {
        return {
            type: LoginActions.CREATE_USER_FAILURE,
            payload: error
        };
    }

    static EMAIL_AUTHENTICATION = '[Login] Email Authentication';
    emailAuthentication(userName: string, password: string): Action {
        return {
            type: LoginActions.EMAIL_AUTHENTICATION,
            payload: {
                userName: userName,
                password: password
            }
        };
    }

    static EMAIL_AUTHENTICATION_SUCCESS = '[Login] Email Authentication Success';
    emailAuthenticationSuccess(user: FirebaseAuthState): Action {
        return {
            type: LoginActions.EMAIL_AUTHENTICATION_SUCCESS,
            payload: user
        };
    }

    static EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure';
    emailAuthenticationFailure(error): Action {
        return {
            type: LoginActions.EMAIL_AUTHENTICATION_FAILURE,
            payload: error
        };
    }

    static GOOGLE_AUTHENTICATION  = '[Login] Google Authentication';
    googleAuthentication(): Action {
        return {
            type: LoginActions.GOOGLE_AUTHENTICATION 
        };
    }

    static GOOGLE_AUTHENTICATION_SUCCESS = '[Login] Google Authentication Success';
    googleAuthenticationSuccess(user: FirebaseAuthState): Action {
        return {
            type: LoginActions.GOOGLE_AUTHENTICATION_SUCCESS,
            payload: user            
        };
    }

    static GOOGLE_AUTHENTICATION_FAILURE = '[Login] Google Authentication Failure';
    googleAuthenticationFailure(error): Action {
        return {
            type: LoginActions.GOOGLE_AUTHENTICATION_FAILURE,
            payload: error
        };
    }

    static LOGOUT = '[Login] Logout';
    logout(): Action {
        return {
            type: LoginActions.LOGOUT
            // payload
        };
    }

    static RESTORE_AUTHENTICATION = '[Login] Restore Authentication';
    restoreAuthentication(user: FirebaseAuthState): Action {
        return {
            type: LoginActions.RESTORE_AUTHENTICATION,
            payload: user
        };
    }
} 
