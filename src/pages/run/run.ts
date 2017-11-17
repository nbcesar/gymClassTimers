import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StudentsProvider } from '../../providers/students/students';

@IonicPage()
@Component({
  selector: 'page-run',
  templateUrl: 'run.html',
})
export class RunPage {

  students: any = [];
  numLaps: number;
  mainTime: any;

  started: boolean = false;
  offset: any;
  clock: any = 0;
  interval: any;
  clockString: string = '00:00:00.00';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public studentData: StudentsProvider
  ) {
    this.students = navParams.get('students');
    this.numLaps = navParams.get('laps');
    this.setUpStudents();
  }

  ionViewDidLoad() {
    
  }

  setUpStudents() {
    if (this.students && this.students.length > 0) {
      this.students.forEach( student => {
        student['numLaps'] = 0;
        student['laps'] = [];
      });
    }
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  startClock() {
    this.started = true;
    if (!this.interval) {      
      this.offset = Date.now();
      this.interval = setInterval(() => {
        this.clock += this.delta();
        this.formatClock();
      }, 1);
    }
  }

  stopClock() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetClock() {
    this.clock = 0;
    this.stopClock();
    this.formatClock();
    this.setUpStudents();
  }

  delta() {
    let now = Date.now();
    let d = now - this.offset;
    this.offset = now;
    return d;
  }

  formatClock() {
    this.clockString = new Date(this.clock).toISOString().slice(11, 22);
  }

  lapStudent(i) {
    if (this.interval) {
      if (this.students[i].numLaps < this.numLaps) {
        this.students[i].numLaps++;
        this.students[i].laps.push(this.clockString);
      }
    }
  }

  endRun() {
    this.studentData.saveRun(this.students);
    this.navCtrl.setRoot(HomePage);
  }

}
