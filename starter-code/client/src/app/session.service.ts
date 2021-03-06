import { Injectable,EventEmitter } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SessionService {
  BASE_URL: string = "http://localhost:3000";
  user: object;
  userEvent: EventEmitter<any> =  new EventEmitter();
  options: any = { withCredentials: true }

  constructor(private http: Http) {
  this.isLoggedIn().subscribe();
  }
  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(user?:object){
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    return this.http
      .post(`${this.BASE_URL}/api/signup`, user, this.options)
      .map(res => res.json())
      .map(user => (this.handleUser = user))
      .catch(this.handleError);
  }

  login(username, password) {
    return this.http
      .post(`${this.BASE_URL}/api/login`, { username,password}, this.options)
      .map(res => res.json())
      .map(user => (this.handleUser = user))
      .catch(this.handleError);
  }

  logout() {
    return this.http
      .post(`${this.BASE_URL}/api/logout`,{}, this.options)
      .map(() => this.handleUser())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http
      .get(`${this.BASE_URL}/api/loggedin`, this.options)
      .map(res => res.json())
      .map(user => (this.handleUser = user))
      .catch(this.handleError);
  }
}

