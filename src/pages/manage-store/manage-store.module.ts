import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageStorePage } from './manage-store';

@NgModule({
  declarations: [
    ManageStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageStorePage),
  ],
})
export class ManageStorePageModule {}
