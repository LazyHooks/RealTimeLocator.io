import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageStocksPage } from './manage-stocks';

@NgModule({
  declarations: [
    ManageStocksPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageStocksPage),
  ],
})
export class ManageStocksPageModule {}
