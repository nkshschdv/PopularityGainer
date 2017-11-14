import { HomePage } from './../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { Component, ViewChild , OnInit} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/authService';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../pages/profile/profile';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {LoadingController} from 'ionic-angular';
import {BarcodeScanner}  from '@ionic-native/barcode-scanner';
import { BarcodePage } from '../pages/barcode/barcode';
import { DataService } from '../services/dataService';
import { TopGainersPage } from '../pages/top-gainers/top-gainers';
import { StatsPage } from '../pages/stats/stats';
import { Storage} from '@ionic/storage';









@Component({
  templateUrl: 'app.html'
})
export class MyApp {
// Nav child
  @ViewChild(Nav) nav: Nav;
  public logingOut :string ="Loging out";

// page  variables

  rootPage: any;
   loginpage :any= LoginPage;
  signuppage :any= SignupPage;
  listpage :any= ListPage;
  topgainers :any = TopGainersPage;
  statspage :any = StatsPage;

//authetication variable
  authenticationToken :boolean = false;

  // barcode varable
  barcodeResult;




  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authservice: AuthService,
    public afauth: AngularFireAuth,
    private tts: TextToSpeech,
    private load: LoadingController,
    private barcode: BarcodeScanner,
    private dataservice: DataService,
    private storage: Storage,



  ) {


    this.initializeApp();

    //  Token Verification

    this.afauth.auth.onAuthStateChanged((user) =>{
      if(user){
        this.authenticationToken = true;

        this.nav.setRoot(ProfilePage);

      }
      else
      {

        this.authenticationToken = false;
        this.rootPage = HomePage;



      }
    })





  }

  initializeApp() {
    var ApiAIPlugin :any;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });





  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }



  //  logout Method

  logoutUser(){

    const loading = this.load.create({
      spinner: 'dots',
      content: 'loging you out...'

   })
   loading.present();

    this.tts.speak(this.logingOut);


    setTimeout(()=>{
      loading.dismiss();

      this.nav.setRoot(HomePage);

    },1000)
    this.authservice.logout();
    this.storage.clear();

  }


  // Scan QR code method

  async scanQrcode()
  {
    console.log('yes it enters');
   this.barcode.scan()
    .then((barcodeRes) => {
      this.barcodeResult = barcodeRes.text;
      this.dataservice.storeBarcodeData(this.barcodeResult);
      this.nav.push(BarcodePage);

    }).catch((e) =>{
      console.log('failure');
      this.nav.push(ProfilePage);

    })


  }



}
