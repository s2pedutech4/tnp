import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-company-students',
  templateUrl: './company-students.component.html',
  styleUrls: ['./company-students.component.scss']
})
export class CompanyStudentsComponent implements OnInit {

  driveUsers:any = [];
  constructor() { }

  ngOnInit() {
    firebase.database().ref('users').orderByChild('role').equalTo('ROLE_STUDENT').on('value', resp=>{
      this.driveUsers = snapshotToArray(resp);
    });
  }

}
function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });

  return returnArr;
};
