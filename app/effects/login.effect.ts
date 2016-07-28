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
// import { Database } from '@ngrx/db';

import { AppState } from '../reducers';
// import { GoogleBooksService } from '../services/google-books';
import { LoginActions } from '../actions';
// import { TextItem } from '../models';
import { AngularFire, AuthMethods,
  AuthProviders, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class LoginEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    // private googleBooks: GoogleBooksService,
    // private db: Database,
    private loginActions: LoginActions,
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
  // @Effect() openDB$ = this.db.open('books_app').filter(() => false);

  // https://gitter.im/ngrx/store?at=5762a7b8da1c26b04536c435
  // https://gitter.im/ngrx/effects?at=574d8097da3f93da6f21e83b

  // Only allowed one Observable.of?????
  //  @Effect() authenticationInit$ = Observable.of(this.loginActions.restoreAuth());
  // VVVVVV this is being called before authentication check;
  /*
    @Effect() authenticationInit$ = this.updates$
      .do(x => {
        console.log('Effect:authenticationInit');
        
      })
    // Terminate effect.
    .filter(() => false);    
  */
  // What if not logged in????
  // @Effect() loadCollectionOnInit$ = Observable.of(this.textItemActions.loadCollection());

  /*
    @Effect() init$ = this.updates$
      .whenAction(LoginActions.INIT)
      .do(() =>{
        this.loginService.init();
      });
  */

  /*
    @Effect() restoreAuth$ = this.updates$
      .whenAction(LoginActions.RESTORE_AUTH)
      .do(x => {
        console.log('Effect:restoreAuth$>', x);
      });
    // Call next action.
    //.mapTo(this.textItemActions.loadCollection());
  
    // Terminate effect.
    // .filter(() => false);
  */

/*
  @Effect() loadCollection$ = this.updates$
    .whenAction(TextItemActions.LOAD_COLLECTION)
    .do(x => { console.log('Effect:loadCollection$:A', x) })

    .filter(x => x.state.login.isAuthenticated)
    // Watch database node and get TextItems.
    .switchMap(x => this.af.database.list('/textItems'))
    .do(x => { console.log('Effect:loadCollection$:B', x) })
    .map((textItems: TextItem[]) => this.textItemActions.loadCollectionSuccess(textItems));
  // Terminate effect.
  //.filter(() => false);
*/

  /* Attempt 1
    @Effect() authorizeWithEmail$ = this.updates$
      .whenAction(LoginActions.LOGIN_WITH_PASSWORD)
      .map(toPayload)
      .do(x => { console.log('Effect:authorizeWithEmail$:A>', x) })
      .do(x => this.af.auth.login({ email: x.userName, password: x.password }, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      })
        .then((user) => console.log(`Password Login Success:`, user))
        .catch(e => console.error(`Password Login Failure:`, e))
      )
      .do(x => { console.log('Effect:authorizeWithEmail$:B>', x) })
  
      // Terminate effect.
      .filter(() => false);
  */

  //       return Observable.of('aa')

  /* Attempt 2
  Failure only gets called for first failue. Ignores others.
  @Effect() emailAuthentication$ = this.updates$
    .whenAction(LoginActions.EMAIL_AUTHENTICATION)
    .map(toPayload)
    .switchMap(({userName, password}) =>
      this.af.auth.login(
        { email: userName, password: password },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password
        })      
    )
    // If successful, dispatch success action with result
    .map(x => this.loginActions.emailAuthenticationSuccess())
    // If request fails, dispatch failed action             
    .catch(error => Observable.of(this.loginActions.emailAuthenticationFailure(error)));
*/
  @Effect() anonymousAuthentication$ = this.updates$
    .whenAction(LoginActions.ANONYMOUS_AUTHENTICATION)
    .switchMap(() =>
      this.af.auth.login(
        {
          method: AuthMethods.Anonymous
        })
        .then((user) => this.loginActions.anonymousAuthenticationSuccess(user))
        .catch(error => this.loginActions.anonymousAuthenticationFailure(error))
    );

  @Effect() createUser$ = this.updates$
    .whenAction(LoginActions.CREATE_USER)
    .map(toPayload)
    .switchMap(({userName, password}) =>
      this.af.auth.createUser(
        { email: userName, password: password }
      )
        .then((user) => this.loginActions.createUserSuccess(user))
        .catch(error => this.loginActions.createUserFailure(error))
    );

  @Effect() emailAuthentication$ = this.updates$
    .whenAction(LoginActions.EMAIL_AUTHENTICATION)
    .map(toPayload)
    .switchMap(({userName, password}) =>
      this.af.auth.login(
        { email: userName, password: password },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password
        })
        .then((user) => this.loginActions.emailAuthenticationSuccess(user))
        .catch(error => this.loginActions.emailAuthenticationFailure(error))
    );
  // Terminate effect.
  // .filter(() => false);


  @Effect() authorizeWithGoogle$ = this.updates$
    .whenAction(LoginActions.GOOGLE_AUTHENTICATION)
    .switchMap(() =>
      this.af.auth.login(
        {
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
        })
        .then((user) => this.loginActions.googleAuthenticationSuccess(user))
        .catch(error => this.loginActions.googleAuthenticationFailure(error))
    );




  /*
    @Effect() authorizeWithGoogle$ = this.updates$
      .whenAction(LoginActions.LOGIN_WITH_GOOGLE)
      .do(x => { console.log('Effect:authorizeWithGoogle$:A', x) })
      .switchMap(x => this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup,
      }))
      .do(x => { console.log('Effect:authorizeWithGoogle$:B', x) })
       // If successful, dispatch success action with result
       .map(x => this.loginActions.loginWithGoogleSuccess())
       // If request fails, dispatch failed action
       .catch(() => Observable.of(this.loginActions.loginWithGoogleFailed()));
  
      // Terminate effect.
      //.filter(() => false);
  */

  /*
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup,
      })
        .then((user) => console.log(`Google Login Success:`, user))
        .catch(e => console.error(`Google Login Failure:`, e));;
  */

  /*
    @Effect() loadCollection$ = this.updates$
      .whenAction(BookActions.LOAD_COLLECTION)
      .switchMapTo(this.db.query('books').toArray())
      .map((books: Book[]) => this.bookActions.loadCollectionSuccess(books));
  
  
    @Effect() search$ = this.updates$
      .whenAction(BookActions.SEARCH)
      .map<string>(toPayload)
      .filter(query => query !== '')
      .switchMap(query => this.googleBooks.searchBooks(query)
        .map(books => this.bookActions.searchComplete(books))
        .catch(() => Observable.of(this.bookActions.searchComplete([])))
      );
  
  
    @Effect() clearSearch$ = this.updates$
      .whenAction(BookActions.SEARCH)
      .map<string>(toPayload)
      .filter(query => query === '')
      .mapTo(this.bookActions.searchComplete([]));
  
  
    @Effect() addBookToCollection$ = this.updates$
      .whenAction(BookActions.ADD_TO_COLLECTION)
      .map<Book>(toPayload)
      .mergeMap(book => this.db.insert('books', [ book ])
        .mapTo(this.bookActions.addToCollectionSuccess(book))
        .catch(() => Observable.of(
          this.bookActions.addToCollectionFail(book)
        ))
      );
  
  
    @Effect() removeBookFromCollection$ = this.updates$
      .whenAction(BookActions.REMOVE_FROM_COLLECTION)
      .map<Book>(toPayload)
      .mergeMap(book => this.db.executeWrite('books', 'delete', [ book.id ])
        .mapTo(this.bookActions.removeFromCollectionSuccess(book))
        .catch(() => Observable.of(
          this.bookActions.removeFromCollectionFail(book)
        ))
      );
  */
}
