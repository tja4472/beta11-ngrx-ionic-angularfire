import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Error, ErrorInput } from '../../components/error/error.component';

import { Store } from '@ngrx/store';
import { LoginActions } from '../../actions';
import { AppState } from '../../reducers';
import { LoginSelector } from '../../selectors';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Error],
  templateUrl: 'build/pages/signup/signup.page.html'
})
export class SignupPage {
  // signup: { username?: string, password?: string } = {};
  submitted = false;
  public loginForm: FormGroup;

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginActions: LoginActions,
    private store: Store<AppState>) {
    //
    this.loginState$ = this.store.let(LoginSelector.getLoginState());
  }

  ionViewLoaded() {
    //
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logForm() {
    console.log(this.loginForm.value);
    console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        this.loginActions.createUser(
          this.loginForm.value.username,
          this.loginForm.value.password));
    }
  }
  /*
  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.store.dispatch(
        this.loginActions.createUser(
          this.signup.username,
          this.signup.password));
    }
  }
*/
}
