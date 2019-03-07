import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  showSkills:boolean = false;
  skills:string;
  constructor() { }

  ngOnInit() {
  }

  updateSkills()
  {
    //add skills to the user
  }
}
