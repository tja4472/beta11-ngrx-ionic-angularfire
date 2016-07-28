import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';

import { provideStore, combineReducers, Store }from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { compose } from '@ngrx/core/compose';
import actions, { LoginActions } from './actions';
import effects from './effects';
import reducer, { AppState, getLoginState } from './reducers';

import {
  AngularFire,
  defaultFirebase,
  FIREBASE_PROVIDERS,
  FirebaseAuthState
} from 'angularfire2';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [
  /**
   * provideStore is run once at application bootstrap, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   *
   * Source: https://github.com/ngrx/store/blob/master/src/ng2.ts#L43-L69
   */
  provideStore(reducer),

  /**
   * runEffects configures all providers for @ngrx/effects. Observables decorated
   * as an @Effect() within the supplied services will ultimately be merged,
   * with output of relevant (registered as effects) actions being
   * dispatched into your application store. Any side-effects in
   * your application should be registered as effects.
   *
   * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
   */
  runEffects(effects),

  /**
   * Finally we provide additional services and action creators so they can
   * be used by all of our components, effects, and guards.
   */
  // services,
  actions,
  // guards,


  FIREBASE_PROVIDERS,

  // Initialize Firebase app  
  defaultFirebase(MyFirebaseAppConfig.config)
]);
