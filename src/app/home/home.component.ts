import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showLogin:boolean = true;
  showCompany:boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    
  });

  companyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    key: new FormControl(''),
    role: new FormControl('ROLE_COMPANY'),
    uid: new FormControl()
  });

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ssc: new FormControl(60, Validators.required),
    hsc: new FormControl(60, Validators.required),
    be: new FormControl(60, Validators.required),
    branch: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    // mob: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    key: new FormControl(),
    role: new FormControl('ROLE_STUDENT'),
    uid: new FormControl()
  });
  constructor(private route:Router, private auth:AuthService, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
  }

  company()
  {
    console.log(this.companyForm.value);
    let email = this.companyForm.controls.email.value;
      let pwd = this.companyForm.controls.password.value;
      firebase.auth().createUserWithEmailAndPassword(email,pwd).then(success=> {
        alert("User created Successfully");
        this.companyForm.controls.uid.setValue(success.user.uid);
        firebase.database().ref('users').push(this.companyForm.value);
        // this.route.navigate(['/home']);
        this.showLogin = true;
        this.showCompany = false;
      }).catch(error=> {
        console.log(error);
        alert("Unable to create new user")
      });
  }
  login()
  {
    console.log(this.loginForm.value);
    if(this.loginForm.controls.email.value == "admin" && this.loginForm.controls.password.value == "admin")
    {
      
      this.route.navigate(['admin/home']);
    }
    else
    {
      // login using firebase 
      let email = this.loginForm.controls.email.value;
      let pwd = this.loginForm.controls.password.value;
      firebase.auth().signInWithEmailAndPassword(email,pwd).then(success =>{
        firebase.database().ref('users/').orderByChild('uid').equalTo(success.user.uid).on('value', resp =>{
          console.log(resp.val());
          let user = snapshotToArray(resp);
          // this.auth.setCurrentUser(user[0]);
          this.storage.set('user',user[0]);
          // this.auth.setCurrentUser(user[0]);
          if(user[0].role === "ROLE_STUDENT")
            this.route.navigate(['user/home']);
          else
            {
              // navigate to company home page
              this.route.navigate(['company/home']);
            }
        });
        // set the current user in service and then navigate to the userhome page
        //this.auth.setCurrentUser();
        
      }).catch(error => {
        alert("Invalid Login")
      });
    }
  }

  register()
  {
      console.log(this.signUpForm.value);
      let email = this.signUpForm.controls.email.value;
      let pwd = this.signUpForm.controls.password.value;
      firebase.auth().createUserWithEmailAndPassword(email,pwd).then(success=> {
        alert("User creates Successfully");
        this.signUpForm.controls.uid.setValue(success.user.uid);
        firebase.database().ref('users').push(this.signUpForm.value);
        // this.route.navigate(['/home']);
        this.showLogin = true;
      }).catch(error=> {
        console.log(error);
        alert("Unable to create new user")
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