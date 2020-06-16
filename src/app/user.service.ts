import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const link = 'https://manage-my-stocks-database.herokuapp.com';
// const link = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  event = new BehaviorSubject(null);
  currentMessage = this.event.asObservable();

  constructor(private http: HttpClient) { 
    // this.loggedIn = false;
  }

  loggedIn: boolean; 
  
  changeLoggedIn(message: boolean) {
    this.event.next(message);
  }

  register(body: any) {
    return this.http.post(link + '/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this.http.post(link + '/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  user() {
    return this.http.get(link + '/users/transactions', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this.http.get(link + '/users/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}
