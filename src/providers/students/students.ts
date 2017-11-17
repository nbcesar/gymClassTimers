import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from "firebase";
import 'firebase/firestore';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export interface Student { first: string; last: string; period: number; id: string};
export interface Period { id: boolean; };

@Injectable()
export class StudentsProvider {

  students: any = {};
  studentsCollection: AngularFirestoreCollection<Student>;
  
  periodsCollection: AngularFirestoreCollection<Period>;
  periods: any;

  db: any;

  constructor(
    public http: Http,
    public fireStore: AngularFirestore
  ) {
    this.db = firebase.firestore();
    this.getPeriods();
    this.getStudents();
  
  }

  getPeriods() {
    this.periodsCollection = this.fireStore.collection<Period>('periods');
    this.periodsCollection.valueChanges().subscribe( periodsData => {
      this.periods = periodsData;
    });
  }

  getStudents() {
    this.studentsCollection = this.fireStore.collection<Student>('students');
    this.studentsCollection.valueChanges().subscribe( studentsData => {
      this.students = {};
      studentsData.forEach( student => {
        if (!this.students.hasOwnProperty(student['period'])) {
          this.students[student['period']] = [];
        }
        this.students[student['period']].push(student);
      });
      for (var period in this.students) {
        this.students[period].sort(function(a,b) {return (a.last > b.last) ? 1 : ((b.last > a.last) ? -1 : 0);} );
      }
    });
  }

  addStudent(first, last, period) {
  const id = this.fireStore.createId();
    this.fireStore.collection('students').add({
      id: id,
      first: first, 
      last: last,
      period: period
    })
    .then((docRef) => {
      let id = docRef.id;
      this.fireStore.doc(`students/${id}`).update({
        id: docRef.id
      });
      this.db.collection('periods').doc(period).set({
        period: period,
        [id]: true
      }, {merge: true});
      // this.fireStore.doc(`periods/${period}`).set({
      //   [id]: true
      // })
      // .then((docRef2) => {
      //   console.log('yes');
      //   console.log(docRef2);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    })
    .catch( () => {
      console.log('error');
    });
  }

  saveRun(students) {
    let today = new Date();
    students.forEach(student => {
      let id = student['id'];
      if (student.numLaps > 0) {
        this.fireStore.collection(`students/${id}/runs`).add({
          date: today,
          numLaps: student.numLaps,
          laps: student.laps,
          time: student.laps[student.laps.length - 1]
        });
      }
    });
  }

}
