import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';

import { provideStore, combineReducers, Store }from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { compose } from '@ngrx/core/compose';
import actions, { LoginActions } from './actions';
import effects from './effects';
import reducer, { AppState } from './reducers';
import { LoginSelector } from './selectors';

import {
  AngularFire,
  defaultFirebase,
  FIREBASE_PROVIDERS,
  FirebaseAuthState
} from 'angularfire2';

// import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  loginState$: any;

  private subscription;

  constructor(
  
    private loginActions: LoginActions,    
    private platform: Platform,
    public af: AngularFire,      
    private store: Store<AppState>    
  ) {
    this.initializeApp();

     this.loginState$ = this.store.let(LoginSelector.getLoginState());

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 },
      { title: 'Login', component: LoginPage },
      { title: 'Signup', component: SignupPage },
      { title: 'Logout', component: Page1 },     
      { title: 'Home Page', component: HomePage },        
    ];

    // Subscribe to the auth object to check for the login status
    // of the user.      
    af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
      // Run once.
      // af.auth.unsubscribe();

      console.log('af.auth.subscribe:authState>', authState);
      let authenticated: boolean = !!authState;

      console.log('authenticated:', authenticated);

      if (authenticated) {
        this.store.dispatch(loginActions.restoreAuthentication(authState));
      }    
    });  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.subscription =
      this.store
        .let(LoginSelector.getLoginState())
        .subscribe(loginState => {
          // Triggered when loginState changes. 
          // i.e. when user logs in or logs out.
          console.log('loginState>', loginState);
          console.log('loginState.isAuthorized>', loginState.isAuthenticated);
          // this.enableMenu(loginState.isAuthenticated);

          /*
                    if (loginState.isAuthorized) {
                      this.rootPage = HomePage;
                    }
                    else {
                      this.rootPage = LoginPage;
                    }
          */
        });    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // this.userData.logout();
        this.store.dispatch(this.loginActions.logout());
        this.af.auth.logout();
      }, 1000);
    }    
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
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
