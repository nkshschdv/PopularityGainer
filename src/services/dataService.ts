
import { User } from './../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { FIREBASE_CONFIG } from '../app/app.firebase.config';


@Injectable()


export class DataService {
  user = {} as User;
  public setToken: boolean;
  public EmailId: string;
  public userDetails;
  public newsfeeds;
  public getCurrentId;
  public emails;





  //barcode result
  public barcodeResult;

  // user_detail database variable
  public userDetailDb;

  // array of all the data
  public allData = {};

  // all ids
  public allIds = [];

  //all emails
  public allEmails = [];
  public ArrayLength;

  // storage Token
  public storeToken;
  constructor(
    private afAuth: AngularFireAuth,
    private Toast: ToastController,
    private fdatabase: AngularFireDatabase,
    private storage: Storage,

  ) { }



  async storingLoginCredentials(emailId: string) {
    this.EmailId = emailId;
  }


  async getEmailId() {
    return this.EmailId;

  }


  async createDatabases() {

    this.userDetails = this.fdatabase.list('/user_details');
    this.newsfeeds = this.fdatabase.list('/news_feeds/');
  }



  //barcode Information

  async storeBarcodeData(getText: Text) {
    this.barcodeResult = getText;
  }


  async saveCurrentId(getCurrentKey) {
    this.getCurrentId = getCurrentKey;

  }


  async setTheKey() {

    const data = this.storage.get('token').then((tokenVal) => {
      this.storeToken = tokenVal;
    });



  }


  allTheUserDetails() {
    var get_keys;
    var user_data;
    var emails = [];
    // key varible
    var keyId;
    // key length
    var keyLength;
    const userDb = this.fdatabase.database.ref('user_details');

    userDb.on('value', function (snap) {

      user_data = snap.val();
      get_keys = Object.keys(user_data);


      keyLength = get_keys.length;
    })


    this.ArrayLength = this.allEmails.length;

    for (var count = 0; count < this.ArrayLength; count++) {
      this.allEmails.splice(count, this.ArrayLength);
      this.allIds.splice(count, this.ArrayLength);
    }



    for (var i = 0; i < keyLength; i++) {
      keyId = get_keys[i];
      emails = user_data[keyId].email;
      this.allIds.push(keyId);
      this.allEmails.push(emails);

    }



  }


  // getAllUsers(){
  //   var get_keys;
  //   var user_data;
  //   var emails = [];
  //   // key varible
  //   var keyId;
  //   // key length
  //   var keyLength;
  //   const userDb = this.fdatabase.database.ref('user_details');

  //   userDb.on('value', function (snap) {

  //     user_data = snap.val();
  //     get_keys = Object.keys(user_data);


  //     keyLength = get_keys.length;
  //   })


  //   // this.ArrayLength = this.allEmails.length;

  //   for (var i = 0; i < keyLength; i++) {
  //     keyId = get_keys[i];
  //     emails = user_data[keyId].email;
  //     this.allIds.push(keyId);
  //     this.allEmails.push(emails);

  //   }

  //   console.log(this.allEmails);


  // }




}
