import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.scss']
})
export class DrivesComponent implements OnInit {

  drives:any = [];
  showForm:boolean = false;
  driveForm:FormGroup = new FormGroup({
    key: new FormControl(''),
    company: new FormControl(' ', Validators.required),
    drivedate: new FormControl('', Validators.required),
    jobprofile: new FormControl(' ', Validators.required),
    location: new FormControl(' ', Validators.required),
    ssc: new FormControl(60, Validators.required),
    hsc: new FormControl(60, Validators.required),
    be: new FormControl(60, Validators.required),
    process: new FormControl('',Validators.required),
    lastappdate: new FormControl('', Validators.required)
  });
  constructor() { }

  ngOnInit() {
    firebase.database().ref('drives').on('value', resp => {
      console.log(resp);
      this.drives = snapshotToArray(resp);
    });
  }

  AddDrive()
  {
    console.log(this.driveForm.value);
    if(this.driveForm.controls.key.value == null)
      firebase.database().ref('drives').push(this.driveForm.value);
    else
    {
      let path = "drives/" + this.driveForm.controls.key.value;
      firebase.database().ref(path).update(this.driveForm.value);
    }
    this.showForm = false;
    this.driveForm.reset();
  }
  editDrive(d)
  {
    this.driveForm.patchValue(d);
    this.showForm = true;
  }
  deleteDrive(d)
  {
    let path = "drives/" + d.key;
    firebase.database().ref(path).remove();
  }

  showDriveForm()
  {
    this.driveForm.reset();
    this.showForm = true;
  }

  Cancel()
  {
    this.showForm = false;
    this.driveForm.reset();
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
