import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Error, ErrorInput } from '../../components/error/error.component';

import { Store } from '@ngrx/store';
import { LoginActions } from '../../actions';
import { AppState } from '../../reducers';
import { LoginSelector } from '../../selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Error],
  templateUrl: 'build/pages/signup/signup.page.html'
})
export class SignupPage {
  signup: { username?: string, password?: string } = {};
  submitted = false;

  loginState$: any;

  constructor(
    private loginActions: LoginActions,
    private store: Store<AppState>) {
    //
    this.loginState$ = this.store.let(LoginSelector.getLoginState());
  }

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.store.dispatch(
        this.loginActions.createUser(
          this.signup.username,
          this.signup.password));
    }
  }
}
