import { AuthService } from './../services/authService';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import {storage} from 'firebase';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from "../pages/profile/profile";
import { ListPage } from '../pages/list/list';
import { DataService } from '../services/dataService';
import { HandlingInputsPage } from '../pages/handling-inputs/handling-inputs';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { BarcodePage } from '../pages/barcode/barcode';
import {BarcodeScanner}  from '@ionic-native/barcode-scanner';
import { StatsPage } from '../pages/stats/stats';
import { TopGainersPage } from '../pages/top-gainers/top-gainers';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ListPage,
    HandlingInputsPage,
    BarcodePage,
    StatsPage,
    TopGainersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ListPage,
    HandlingInputsPage,
    BarcodePage,
    TopGainersPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DataService,
    TextToSpeech,
    SpeechRecognition,
    BarcodeScanner,
    Camera
  ]
})
export class AppModule {}
