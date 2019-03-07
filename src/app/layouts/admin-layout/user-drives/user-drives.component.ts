import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-user-drives',
  templateUrl: './user-drives.component.html',
  styleUrls: ['./user-drives.component.scss']
})
export class UserDrivesComponent implements OnInit {
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
  currentUser:any = null;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    firebase.database().ref('drives').on('value', resp => {
      // console.log(resp);
      this.drives = snapshotToArray(resp);
    });
    this.currentUser = this.storage.get('user');
    console.log(this.currentUser);
    
  }

  applyDrive(d)
  {
    let path ='drives/'+d.key;
    // apply to the drive under users array
    firebase.database().ref(path).once('value', resp => {
      // check if the user already exists
      firebase.database().ref(path + '/users').orderByChild('key').equalTo(this.currentUser.key).once('value', response => {
        console.log("after query");
        let user = snapshotToArray(response);
        console.log(user);
        if(user.length == 0)
        {
          firebase.database().ref(path + '/users').push(this.currentUser);
          alert("Applied Successfully");
        }
        else
        {
          alert("You have already applied for this drive");
        }
      });
      //firebase.database().ref(path + '/users').push(this.currentUser);
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