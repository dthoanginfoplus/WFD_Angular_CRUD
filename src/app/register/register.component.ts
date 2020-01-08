import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Iuser} from '../interface/iuser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup( {
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  register() {
    const {name, email, password, confirmPassword} = this.registerForm.value;
    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
      return alert('Confirm Password not correct');
    }

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      return alert('Error empty field!');
    }

    const userForm: Iuser = {
      name,
      email,
      password
    };

    this.userService.register(userForm).subscribe(
      result => {
        console.log(result);
        alert(result.message);
        this.router.navigateByUrl('/login');
      }, error =>  {
        console.log(error);
        alert(error.error.mess);
      }
    );
  }
}
