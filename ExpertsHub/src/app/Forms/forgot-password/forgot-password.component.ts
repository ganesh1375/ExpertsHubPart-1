import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/Service/database.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: DatabaseService,private route:Router) { }

  ngOnInit(): void {

  }
  hasError:any=false;
  validOtp:any=false;
  userEmail:any;
  //email variables
  d1=true;
  response1=false;

  //otp variables

  response2=false;


  //email Click
  onClick(email){
    this.userEmail=email;
    this.service.setMessage(email);
    this.service.forgotPassword().subscribe(res=>
      {
       console.log(res.feedback);
       if(res.feedback=="Email not Exist")
       {
         this.response1=true;
         this.hasError=false;
       }
       else
       {
         this.hasError=true;
         this.response1=false;
       }
      },err=>
      {
        console.log(err);
      });
    //this.hasError=true;
  }
  onOtp(otp)
  {
    this.service.setOtp(otp);
    this.service.verifyOtp().subscribe(res=>
      {
        console.log(res.message);
        if(res.message=='correct')
        {
          this.validOtp=true;
          this.response2=false;
        }
        else
        {
          this.validOtp=false;
          this.response2=true;
        }
      })
    
  }

  onNewPassword(loginForm:any)
  {
    // console.log(password);
    // console.log(this.userEmail);
    // let obj={
    //   email:this.userEmail,
    //   password:password
    // }
    // let jsonObj=JSON.stringify(obj);
    // console.log(jsonObj);
    console.log(loginForm);
    this.service.updatePassword(loginForm).subscribe(res=>
      {
        if(res.message=="Updated SuccessFully")
        {
          this.route.navigate(["/login"]);
        }
        else
        {
          console.log("Error");
        }
      })
  }
}
