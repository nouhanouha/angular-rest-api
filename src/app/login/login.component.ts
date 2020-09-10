import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth : AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = localStorage.getItem("user");
    if(user){
      this.router.navigateByUrl('/users')
    }
  }

  errorMessage : string = "";

  login(){
    this.auth.login(this.user.email, this.user.password).subscribe(
      (res)=>{
        this.errorMessage = "";
        if(res){
          localStorage.setItem("user", res.toString());
          this.router.navigateByUrl("/users");
        }else{
          this.errorMessage = "Credentials are incorrect"
        }
      },
      (err)=>{
        this.errorMessage = "An error has occured"
      }
    )
  }

}
