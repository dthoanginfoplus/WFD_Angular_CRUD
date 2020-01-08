import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {Iuser} from '../interface/iuser';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;
  currentUserId: string;
  userId: string;
  private userList: Iuser[];

  constructor( private tokenStorage: TokenStorageService,
               private userService: UserService,
               private router: Router) {
    this.token = tokenStorage.getToken();
    this.currentUserId = tokenStorage.getUserId();
  }

  ngOnInit() {
    this.showAllUser();
  }

  showAllUser() {
    if (this.token) {
      console.log(this.token);
      this.userService.getAllUser(this.token).subscribe(
        result => {
          console.log(result);
          this.userList = result;
        }, error =>  {
          console.log(error);
        }
      );
    }
  }


  logout() {
    this.tokenStorage.logout();
    this.router.navigateByUrl('/login');
  }

  getUserId(id: string) {
    this.userId = id;
  }


  deleteUser(closeConfirmModal: HTMLButtonElement) {
    this.userService.deleteUser(this.userId).subscribe(
      result => {
        this.showAllUser();
        closeConfirmModal.click();
        if (this.userId == this.currentUserId) {
          this.logout();
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
