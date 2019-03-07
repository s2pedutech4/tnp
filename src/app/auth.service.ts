import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:any = null;
  getCurrentUser()
  {
    return this.currentUser;
  }
  setCurrentUser(u)
  {
    this.currentUser = u;
  }
  constructor() { }
}
