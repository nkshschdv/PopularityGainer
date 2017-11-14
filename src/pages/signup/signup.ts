import { LoginPage } from './../login/login';
import { AuthService } from './../../services/authService';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ToastController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import {LoadingController} from 'ionic-angular';



@IonicPage()

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user = {} as User;
  public signupEntry :string ="Please Enter your Signup Credentials";

  constructor( public navParams: NavParams,

    private authServices: AuthService,
    private navctrl: NavController,
    private Toast: ToastController,
    private tts: TextToSpeech,
    private load: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    this.tts.speak(this.signupEntry);
  }


  async signup(user: User, myForm){
    const loading = this.load.create({
      spinner: 'dots',
      content: 'Signing you up...'

   })
   loading.present();
    let res = await  this.authServices.setAuthentication(user);
    myForm.reset();

    if(res.uid)
    {
      loading.dismiss();
    const toast = this.Toast.create({
      message: 'Thankyou for Signing Up ',
      position:'bottom',
      duration: 100

    });

    toast.present();
    this.tts.speak('Thank you for signing up');
    this.navctrl.push(LoginPage);
    }
    else
    {
      loading.dismiss();
      this.tts.speak(res.message);

    }

  }
}
