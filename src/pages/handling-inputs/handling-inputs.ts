import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/authService';
import { Storage } from '@ionic/storage';
import {Camera ,CameraOptions} from '@ionic-native/camera';
import { DataService } from '../../services/dataService';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import {storage} from 'firebase';

@IonicPage()
@Component({
  selector: 'page-handling-inputs',
  templateUrl: 'handling-inputs.html',
})
export class HandlingInputsPage {
  public emailId :string;
  public profilepage = ProfilePage;
  //
  public storeToken;

   //create camera variables image , cameraoptions
   //create camera variables image , cameraoptions
   public image;
   options :CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE
   }





  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public authservice: AuthService,
     public Storage :Storage,
     public dataservice :DataService,
     public camera: Camera,


     public toast: ToastController

    ) {

      this.emailId  = this.navParams.get('EmailId');


  }




  ionViewDidLoad() {


  }

  gotoProfilePage(profilepage){
    this.navCtrl.push(profilepage);
    this.authservice.setTheToken();

    }


    clickImage()
    {

     this.camera.getPicture(this.options).then((imageData) => {


       let uploadImg = 'data:image/jpeg;base64,' + imageData;
       this.image = uploadImg;


       const pictures = storage().ref(`pictures/${this.emailId}/profilepic`);

       pictures.putString(uploadImg , 'data_url')



     }, (err) => {
       console.log('no cordova')
       // Handle error
      });


    }





}
