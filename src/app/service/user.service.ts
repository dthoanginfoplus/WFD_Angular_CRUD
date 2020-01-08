import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Iuser} from '../interface/iuser';
import {Observable} from 'rxjs';
import {IResLogin} from '../interface/i-res-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localUserURL = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) { }

  register(userForm: Iuser): Observable<any> {
    return this.http.post<any>(this.localUserURL , userForm);
  }

  login(loginForm: Iuser): Observable<IResLogin> {
    return this.http.post<IResLogin>(this.localUserURL + 'login' , loginForm);
  }

  getAllUser(token: string): Observable<Iuser[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text').append('x-access-token', token);
    return this.http.get<Iuser[]>(this.localUserURL, {headers});
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.localUserURL + id);
  }
}
