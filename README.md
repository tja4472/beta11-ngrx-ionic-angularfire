Currently requires "firebase": "3.2.0".
3.2.1 gives error on 
      // Run once.
      af.auth.unsubscribe();

#### Created using sidemenu template.
http://ionicframework.com/docs/v2/getting-started/installation/
```
ionic start myApp sidemenu --v2
```

#### AngularFire2
Home page: https://github.com/angular/angularfire2

https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
```
npm install angularfire2 firebase --save

typings install file:node_modules/angularfire2/firebase3.d.ts --save --global && typings install
```


#### @ngrx
Home page: https://github.com/ngrx/store
```
npm install @ngrx/core --save

npm install @ngrx/store --save

npm install @ngrx/effects --save
```

#### ngrx-store-logger
Home page: https://github.com/btroncone/ngrx-store-logger
```
npm install ngrx-store-logger --save
```

#### my-firebase-app-config.ts
This has been excluded from git.
```typescript
import {
    FirebaseAppConfig
} from 'angularfire2';

export class MyFirebaseAppConfig {
    static config: FirebaseAppConfig = {
    apiKey: '????????',
    authDomain: '?????????',
    databaseURL: '?????????',
    storageBucket: '?????????'
  };
}
```

Called in app.ts.
```typescript
ionicBootstrap(MyApp, [
  ....
  ....

  FIREBASE_PROVIDERS,

  // Initialize Firebase app  
  defaultFirebase(MyFirebaseAppConfig.config)
]);
```