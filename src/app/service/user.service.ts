import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Iuser} from '../interface/iuser';
import {Observable} from 'rxjs';
import {IReqLogin} from '../interface/i-req-login';
import {IReqPWForm} from '../interface/ireq-pwform';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localUserURL = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) { }

  register(userForm: Iuser): Observable<any> {
    return this.http.post<any>(this.localUserURL , userForm);
  }

  login(loginForm: Iuser): Observable<IReqLogin> {
    return this.http.post<IReqLogin>(this.localUserURL + 'login' , loginForm);
  }

  getAllUser(token: string): Observable<Iuser[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('x-access-token', token);
    return this.http.get<Iuser[]>(this.localUserURL, {headers});
  }

  deleteUser(id: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('x-access-token', token);
    return this.http.delete<void>(this.localUserURL + id, {headers});
  }

  getUserById(id: string, token: string): Observable<Iuser> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('x-access-token', token);
    return this.http.get<Iuser>(this.localUserURL + id, {headers});
  }

  updateUser(formUser: Iuser, token: string , id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('x-access-token', token);
    return this.http.put<any>(this.localUserURL + id , formUser, {headers});
  }

  updatePassword(id: string , form: IReqPWForm, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('x-access-token', token);
    return this.http.put<any>(this.localUserURL + 'updatePassword/' + id , form , {headers});
  }
}
