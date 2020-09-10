import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  listUsers: User[];
  userUpdating: User = null;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (!user) {
      this.router.navigateByUrl('/login')
    }

    this.listUsers = [];
   this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.listUsers = res as User[];
    })
  }

  remove(user: User) {
    if (confirm("Are you sure you want to delete this user? ")) {
      this.userService.remove(user.id).subscribe(
        (res)=>{
          this.getUsers();
        }
      )
    }
  }


  update(user) {
    this.creating = false;
    this.userUpdating = user;
  }

  save() {
    if (this.creating) {
      this.userService.createUser(this.userUpdating).subscribe(
        (res) => {
          this.userUpdating = null;
          this.getUsers();
        }
      )
    } else {
      this.userService.updateUser(this.userUpdating, this.userUpdating.id).subscribe(
        (res) => {
          this.userUpdating = null;
        }
      )
    }
  }

  creating = false;

  createNewUser() {
    this.creating = true;
    this.userUpdating = new User();
  }

  cancel(){
    this.creating =false;
    this.userUpdating = null;
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl("/login")
  }



}
