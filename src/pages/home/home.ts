import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { Storage} from '@ionic/storage';
import { DataService } from '../../services/dataService';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  //variable for slides
  public slides;

    //all emails
  public allEmails = [];
  public AllEmail;
  public ArrayLength;


  // getting the data of the voice input in the getVoiceData variable
  public getVoiceData;



  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public speechrecognition: SpeechRecognition,
    public toast: ToastController,
    private storage: Storage,
    private dataService: DataService,


  ) {


  }



  ionViewWillEnter(){
     this.viewCtrl.showBackButton(false);

     this.speechrecognition.requestPermission()
     .then(
       () => console.log('Granted'),
       () => console.log('Denied')


     )

     // getting All
     this.dataService.allTheUserDetails();
     this.AllEmail = this.dataService.allEmails;






  }


  // speech Recognition function
      performSpeechAction(){


        this.speechrecognition.startListening()
        .subscribe(
          (matches: Array<string>) =>
          { this.getVoiceData = matches[0];
            //
            if(this.getVoiceData == 'login')
            {
              const toast = this.toast.create({
                message: 'login',
                position:'bottom',
                duration: 100

              });
              toast.present();
              this.navCtrl.push(LoginPage);

            }
            if(this.getVoiceData == 'signup')
            {
              this.navCtrl.push(SignupPage);
              const toast = this.toast.create({
                message: 'signup',
                position:'bottom',
                duration: 100

              });
              toast.present();
              this.navCtrl.push(SignupPage);
            }
            else
            {
              console.log('nothing');
            }



          }


        )
      }


      // gesture events

      pressEvent(e){
        this.performSpeechAction();

      }












}
