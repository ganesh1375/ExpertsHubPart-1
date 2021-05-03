import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:5500/api';
  _loginUrl:string="http://localhost:5500/api/login";


  email:any;
  otp:any;
  finalPassword:any;
  setMessage(email)
  {
    this.email=email;
  }
  setOtp(otp)
  {
    this.otp=otp;
  }
  setObj(obj)
  {
    this.finalPassword=obj;
  }
  enroll(data) {
    //console.log(data);
    return this.http.post<any>(`${this.baseUrl}/enroll`, data)
  }
  // get(){
  //   return this.http.get(`${this.baseUrl}/enroll`);
  // }

  loginUser(user:any)
  {
    return this.http.post<any>(this._loginUrl,user);
  }
  //forgot Password
  forgotPassword()
  {
    return this.http.get<any>(`http://localhost:5500/api/email/${this.email}`);
  }
  //Verifing Otp
  verifyOtp()
  { 
    return this.http.get<any>(`http://localhost:5500/api/resetPassword/${this.otp}`);
  }

  //updating Password
  updatePassword(password:any)
  {
    return this.http.post<any>(`http://localhost:5500/api/newPassword`,password)
  }


}
