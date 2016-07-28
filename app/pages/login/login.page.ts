import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup.page';

import { Error, ErrorInput } from '../../components/error/error.component';

import { Store } from '@ngrx/store';
import { LoginActions } from '../../actions';
import { AppState, getLoginState } from '../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,  
  directives: [Error],  
  templateUrl: 'build/pages/login/login.page.html'
})
export class LoginPage {
  login: { username?: string, password?: string } = {};
  submitted = false;

  loginState$: any;

  constructor(
    private loginActions: LoginActions,
    private nav: NavController,
    private store: Store<AppState>) { 
      //
      this.loginState$ = this.store.let(getLoginState());
    }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.store.dispatch(
        this.loginActions.emailAuthentication(
          this.login.username,
          this.login.password));
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  signInAnonymously() {
    this.store.dispatch(
      this.loginActions.anonymousAuthentication());
  }

  signInWithGoogle() {
    this.store.dispatch(
      this.loginActions.googleAuthentication());
  }
}
