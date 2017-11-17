import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StudentsProvider } from '../../providers/students/students';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
export interface Period { id: boolean; };
export interface Student { first: string; last: string; period: number; id: string};

@IonicPage()
@Component({
  selector: 'page-rosters',
  templateUrl: 'rosters.html',
})
export class RostersPage {

  periods: Observable<Period[]>;
  //students: Observable<Student[]>;
  students: any = {};
  studentsByPeriod: any = {};

  first: string;
  last: string;
  period: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public studentData: StudentsProvider
  ) {
    //this.periods = this.studentData.periodsCollection.valueChanges();
    this.getStudents();
    this.periods = this.studentData.periods;
    //this.students = this.studentData.students;

  }

  ionViewDidLoad() {
  }

  getStudents() {
    this.students = this.studentData.studentsCollection.valueChanges();
    this.students.subscribe((students) => {
      this.studentsByPeriod = {};
      students.forEach( student => {
        if (!this.studentsByPeriod.hasOwnProperty(student['period'])) {
          this.studentsByPeriod[student['period']] = [];
        }
        this.studentsByPeriod[student['period']].push(student);
      });
      for (var period in this.studentsByPeriod) {
        this.studentsByPeriod[period].sort(function(a,b) {return (a.last > b.last) ? 1 : ((b.last > a.last) ? -1 : 0);} );
      }
    });
    
    
  }

  addStudent() {
    if (this.first != '' && this.last != '' && this.period != null) {
      this.studentData.addStudent(this.first, this.last, this.period);
      this.first = ''; this.last = ''; this.period = null;
    }
    else {
      console.log('something went wrong');
    }
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}