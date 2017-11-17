import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentsProvider } from '../../providers/students/students';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public studentData: StudentsProvider) {

  }

  goToStudents() {
    this.navCtrl.push('RostersPage');
  }

  goToNewRun() {
    this.navCtrl.push('RunSetUpPage');
  }
}
