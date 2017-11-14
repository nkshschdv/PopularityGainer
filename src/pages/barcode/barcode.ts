import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { DataService } from '../../services/dataService';


@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {


  //barcode Retrieve variable
  public getData;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataservice: DataService
  ) {
  }

  ionViewDidLoad() {
    // hiding back button
    this.viewCtrl.showBackButton(false);

    // getting the barcode data from the data Service
    this.getData = this.dataservice.barcodeResult;
  }

}
