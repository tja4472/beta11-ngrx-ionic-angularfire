import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup.page';

import { Error, ErrorInput } from '../../components/error/error.component';

import { Store } from '@ngrx/store';
import { LoginActions } from '../../actions';
import { AppState } from '../../reducers';
import { LoginSelector } from '../../selectors';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Error],
  templateUrl: 'build/pages/login/login.page.html'
})
export class LoginPage {
  // login: { username?: string, password?: string } = {};
  submitted = false;
  public loginForm: FormGroup; 

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginActions: LoginActions,
    private nav: NavController,
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
        this.loginActions.emailAuthentication(
          this.loginForm.value.username,
          this.loginForm.value.password));
    }    
  }
/*
  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.store.dispatch(
        this.loginActions.emailAuthentication(
          this.login.username,
          this.login.password));
    }
  }
*/

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
