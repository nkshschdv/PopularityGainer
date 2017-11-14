import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/dataService';



@IonicPage()
@Component({
  selector: 'page-top-gainers',
  templateUrl: 'top-gainers.html',
})
export class TopGainersPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public dataservice: DataService,

  ) {
  }

  ionViewDidLoad() {

    this.dataservice.allTheUserDetails();

  }

}
