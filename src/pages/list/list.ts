import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../../services/dataService';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  listpage: any = ListPage;
  // Storage token
  public storeToken: string;

  //data Array
  public dataArray = {};
  userDetails;

  // all emails
  public allEmail = [];
  public ArrayLength;


  // all ids
  public allIds = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private fdatabase: AngularFireDatabase,
    private dataservice: DataService,
    private alert: AlertController,
    private storage: Storage,
  ) {

    // this.dataservice.getCurrentId;
    this.dataservice.allTheUserDetails();




  }


  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);







    this.allEmail = this.dataservice.allEmails;
    this.allIds = this.dataservice.allIds;



  }



  like(){
    console.log('thumb is pressed');
  }









}
