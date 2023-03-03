import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userState: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any) {
    return this.http.post<any>(
      'http://localhost:3000/signedUpUsersList',
      userData
    );
  }

  login() {
    return this.http.get<any>('http://localhost:3000/signedUpUsersList');
  }
}
