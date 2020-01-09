import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {Iuser} from '../interface/iuser';
import {FormControl, FormGroup} from '@angular/forms';
import {IReqPWForm} from '../interface/ireq-pwform';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
   idParam: any;
   token: string;
   user: Iuser;

   pwForm = new FormGroup({
     currentPassword: new FormControl(''),
     newPassword: new FormControl(''),
     confirmPassword: new FormControl('')
   });

  constructor(private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
    });

    this.token = this.tokenStorage.getToken();
  }

  ngOnInit() {
    console.log(this.idParam, this.token);
    this.showUserById();
  }

  showUserById() {
    if (this.token) {
      this.userService.getUserById(this.idParam, this.token).subscribe(
        result => {
          console.log(result);
          this.user = result[0];
          console.log(this.user);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  updateProfileUser() {
    console.log(this.user.name , this.user.id , this.user.email);
    if (this.token) {
      const userForm: Iuser = {
        name: this.user.name,
        email: this.user.email
      };
      console.log(userForm);
      this.userService.updateUser(userForm, this.token , this.user.id ).subscribe(
        result => {
          console.log(result);
          this.showUserById();
          alert(result.message);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  updatePassword(closeModalRef1: HTMLButtonElement) {
    if (this.token) {
      const {currentPassword, newPassword, confirmPassword} = this.pwForm.value;
      console.log(confirmPassword, currentPassword, newPassword);
      if (newPassword !== confirmPassword) {
        return alert('Password Confirm Not Correct');
      }

      const passForm: IReqPWForm = {
        currentPassword,
        newPassword
      };
      console.log(passForm);
      this.userService.updatePassword(this.idParam , passForm , this.token).subscribe(
        result => {
          closeModalRef1.click();
          alert(result.message);
          this.pwForm.reset('');
        }, error => {
          console.log(error);
          alert(error.error.message);
        }
      );
    }
  }
}
