import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentsProvider } from '../../providers/students/students';
import { HomePage } from '../home/home';

export interface Student { first: string; last: string; period: number; id: string};

@IonicPage()
@Component({
  selector: 'page-run-set-up',
  templateUrl: 'run-set-up.html',
})
export class RunSetUpPage {

  periods: any;
  students: any;

  numLaps: number = 0;
  selectedStudents: Array<Student[]> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public studentData: StudentsProvider
  ) {
    this.periods = this.studentData.periods;
    this.students = this.studentData.students;
  }

  ionViewDidLoad() {
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  getSet() {
    this.navCtrl.push('RunPage', {students: this.selectedStudents, laps: this.numLaps});
  }

  updateSelectedStudent(e, student) {
    if (e.checked) {
      this.selectedStudents.push(student);
    }
    else {
      let indexOfStudent = this.selectedStudents.findIndex( i => i['id'] = student.id);
      if (indexOfStudent != -1) this.selectedStudents.splice(indexOfStudent,1);
    }
  }
}
