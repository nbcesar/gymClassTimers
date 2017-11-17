import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RostersPage } from './rosters';

@NgModule({
  declarations: [
    RostersPage,
  ],
  imports: [
    IonicPageModule.forChild(RostersPage),
  ],
})
export class RostersPageModule {}
