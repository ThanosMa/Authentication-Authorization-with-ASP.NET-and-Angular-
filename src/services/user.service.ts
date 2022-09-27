import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'https://localhost:44302';
  // httpOptions = {
  //   headers: new HttpHeaders({'content-Type':'application/json'})
  // }
  constructor(private http:HttpClient) { }

  registerUser(user: User):Observable<User> {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    console.log(user);
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post<User>(this.rootUrl+'/api/User/Register',body,{headers : reqHeader});
  }

  userAuthentication(userName:string, password:string) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims',
   {headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}
   
   );
  }
}
