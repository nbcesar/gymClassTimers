import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RunSummaryPage } from './run-summary';

@NgModule({
  declarations: [
    RunSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(RunSummaryPage),
  ],
})
export class RunSummaryPageModule {}
