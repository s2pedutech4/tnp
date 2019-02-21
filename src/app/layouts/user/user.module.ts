import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivelistComponent } from './drivelist/drivelist.component';
import { UsercomponentComponent } from './usercomponent/usercomponent.component';
import { Routes } from '@angular/router';

var routes:Routes = [{ path: 'driveslist',      component: DrivelistComponent },
{ path: 'profile',   component: UsercomponentComponent }];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DrivelistComponent, UsercomponentComponent]
})
export class UserModule { }
