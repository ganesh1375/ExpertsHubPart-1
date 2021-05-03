import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/Service/database.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidEmail: any = false;
  constructor(private service: DatabaseService,private route:Router) { }
  invalidPassword: any = false;
  loginForm: FormGroup;

  ngOnInit(): void {
    $(document).ready(() => {
      //alert('I am Called From jQuery');
      // $(window).on("load", function () {
      $(".loader-wrapper").fadeOut(1000);
      //});
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required/*,Validators.minLength(8)*/])
    })

  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  async signIn(loginForm: any) {
    // let email = this.email.value;
    // email = email.toString()
    //console.log(loginForm.value);
    await this.service.loginUser(this.loginForm.value).subscribe(res => {
      if (res != null) {
        this.invalidEmail = false;
        if (res.message == "SuccessFull") {
          //console.log(res.message);
          this.route.navigate(['']);
          this.invalidPassword = false;
        }
        else {
          //console.log("Thanks Namsthe")
          this.invalidPassword = true;
        }
      }
      else {
        //console.log("Thanks Namsthe");
        this.invalidEmail = true;
      }
    });
  }
}
