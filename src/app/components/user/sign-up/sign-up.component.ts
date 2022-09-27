import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User= new User();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles!:any[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.resetForm();
    this.userService.getAllRoles().subscribe(
      (data : any)=>{
        console.log("check gia subscribe");
        data.forEach((obj:any) => obj.selected = false);
        this.roles = data;
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
      this.user = {
      UserName: '',
      Password: '',
      // ConfirmPassword: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
    if (this.roles)
      this.roles.map(x => x.selected = false);
  }

  OnSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.userService.registerUser(form.value,x)
      .subscribe((data: any) => {
        console.log("-----------------");
        console.log(data);
        if (data.Succeeded == true) {
          this.resetForm(form);
          alert('User registration successful');
        }
        else
        alert('User registration error');;
      });
  }

  updateSelectedRoles(index:number) {
    this.roles[index].selected = !this.roles[index].selected;
  }
}
