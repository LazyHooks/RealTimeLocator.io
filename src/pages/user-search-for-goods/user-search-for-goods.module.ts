import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchForGoodsPage } from './user-search-for-goods';

@NgModule({
  declarations: [
    UserSearchForGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchForGoodsPage),
  ],
})
export class UserSearchForGoodsPageModule {}
