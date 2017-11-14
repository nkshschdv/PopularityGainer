import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataService } from '../../services/dataService';
import { ListPage } from '../list/list';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public slides;
  listpage: any = ListPage
  public checkArray = [1,2,3,4];
  public ArrayLength;

  // all emails
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private dataService: DataService,

  ) {





  }

  async ionViewDidLoad() {

    this.viewCtrl.showBackButton(false);
    this.dataService.setTheKey();
    this.dataService.allTheUserDetails();









  }








}
