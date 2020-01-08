import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Iuser} from '../interface/iuser';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    console.log(this.tokenStorage.getUserId(),
      this.tokenStorage.getUserName(),
      this.tokenStorage.getEmail(),
      this.tokenStorage.getToken());
  }

  login() {
    const {email , password} = this.loginForm.value;
    console.log(email, password);
    if (email === '' || password === '') {
      return alert('Email or password null');
    }
    const loginForm: Iuser = {
      email,
      password
    };
    this.userService.login(loginForm).subscribe(
      result => {
        this.tokenStorage.saveUserId(result.dataUser.id);
        this.tokenStorage.saveToken(result.token);
        this.tokenStorage.saveUserName(result.dataUser.name);
        this.tokenStorage.saveEmail(result.dataUser.email);
        this.router.navigateByUrl('/');
      }, error => {
        console.log(error);
      }
    );
  }
}
