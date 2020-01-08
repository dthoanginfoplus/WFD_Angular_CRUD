import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USER_NAME = 'name';
const EMAIL = 'email';
const USER_ID = 'id';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  logout() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserName(name: string) {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, name);
  }

  public getUserName(): string {
    return window.sessionStorage.getItem(USER_NAME);
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }

  public getEmail(): string {
    return window.sessionStorage.getItem(EMAIL);
  }

  public saveUserId(id: string) {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }

  public getUserId(): string {
    return window.sessionStorage.getItem(USER_ID);
  }
}
