import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//add camera Plugn
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public camera: Camera,
     public toast: ToastController
    ) {


  }

  ionViewDidLoad() {
  }











}
