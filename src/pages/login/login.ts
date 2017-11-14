import { HomePage } from './../home/home';
import { AuthService } from './../../services/authService';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicPage, NavParams, NavController, ToastController, ViewController } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { DataService } from '../../services/dataService';
import { HandlingInputsPage } from '../handling-inputs/handling-inputs';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //form variable
  user = {} as User;
  // signinToken
  signinToken: boolean = false;
  //  current User ID
  public CurrentUserId;

  //datbase variables
  public userDetails;
  public getId;
  public currentUserId;
  public getKey;
  public flag = false;
  public emailCount;
  public AllEmail = [];

  public text: string;
  public loginEntry: string = "Please Enter your Login Credentials";
  public token: boolean = false;
  constructor(
    public navParams: NavParams,
    public authServices: AuthService,
    private navctrl: NavController,
    private Toast: ToastController,
    private viewCtrl: ViewController,
    private dataService: DataService,
    private tts: TextToSpeech,
    private fdatabase: AngularFireDatabase,
    private load: LoadingController,
    private storage: Storage,
  ) {
    // this.dataService.createDatabases();

    this.userDetails = this.fdatabase.database.ref('user_details');
    this.dataService.allTheUserDetails();
    this.AllEmail = this.dataService.allEmails;

  }


  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);
    this.tts.speak(this.loginEntry);


  }



  // Text to speech Implimented
  async speakText(): Promise<any> {

    try {
      await this.tts.speak(this.text);
    }
    catch (e) {
      console.log(e);
    }


  }


  // login main function

  async login(user: User, myForm) {
    //login loading

    const loading = this.load.create({
      spinner: 'dots',
      content: 'Logining you in...'
    })
    loading.present();
    let res = await this.authServices.checkAuthentication(user);
    myForm.reset();


    // condition check for the insertion of data
    if (res.uid) {

      loading.dismiss();
      var email = res.email;
      var length = this.dataService.allEmails.length;
      for (var count = 0; count < length; count++) {
        if (this.AllEmail[count] == email) {

          this.flag = true;

        }


      }

      if (!this.flag == true) {
        this.getId = this.userDetails.push({
          email: user.email,
          uid: res.uid
        })



        // getting the current userId
        this.currentUserId = this.getId.path.pieces_[1];

        //  storing data

        this.storage.set('token', this.currentUserId);

        // Login Toast
        const toast = this.Toast.create({
          message: 'Welcome to popularity gainer',
          position: 'bottom',
          duration: 1000

        });


        // speech recognition
        this.tts.speak('welcome to popularity gainer');
        this.dataService.userDetails;
        toast.present();
        this.dataService.storingLoginCredentials(res.email);
        this.navctrl.push(HandlingInputsPage, { EmailId: res.email });
        this.flag = false;
      }

      this.tts.speak('welcome to popularity gainer');

    }
    else {
      // if login does not holds good
      loading.dismiss();

      const toast = this.Toast.create({
        message: res,
        position: 'bottom',
        duration: 1000
      });

      toast.present();
      this.tts.speak(res);
    }




  }

}
