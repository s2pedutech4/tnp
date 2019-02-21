import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ssc: new FormControl(60, Validators.required),
    hsc: new FormControl(60, Validators.required),
    be: new FormControl(60, Validators.required),
    branch: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mob: new FormControl('', Validators.required)
  });
  constructor(private route:Router) { }

  ngOnInit() {
  }

  login()
  {
    console.log(this.loginForm.value);
    if(this.loginForm.controls.username.value == "admin" && this.loginForm.controls.password.value == "admin")
    {
      this.route.navigate(['admin/home']);
    }
  }
}
