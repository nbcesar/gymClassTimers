import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StudentsProvider } from '../providers/students/students';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCTYfImH4bXiKpOqMdGZmz3tnq-8Ln1dHc",
      authDomain: "gymclasstimers.firebaseapp.com",
      databaseURL: "https://gymclasstimers.firebaseio.com",
      projectId: "gymclasstimers",
      storageBucket: "gymclasstimers.appspot.com",
      messagingSenderId: "631627041049"
    }),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentsProvider
  ]
})
export class AppModule {}
