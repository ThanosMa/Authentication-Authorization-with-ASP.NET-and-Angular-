import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError:boolean=false;
  constructor(private userService:UserService, private router:Router) { }

  OnSubmit(userName:string, password:string){
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userRoles',data.role);
      console.log(data);
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }


  ngOnInit(): void {
  }

}
