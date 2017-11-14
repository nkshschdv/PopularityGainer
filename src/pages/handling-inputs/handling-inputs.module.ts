import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandlingInputsPage } from './handling-inputs';

@NgModule({
  declarations: [
    HandlingInputsPage,
  ],
  imports: [
    IonicPageModule.forChild(HandlingInputsPage),
  ],
})
export class HandlingInputsPageModule {}
