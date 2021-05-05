import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/Service/database.service';
import { passwordValidators } from '../Validators/password.validators';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: DatabaseService,private route:Router) { }
  registerForm: FormGroup;
  isEmailExist: boolean = false;
  submitted = false;
  emailFromUser: any;
  docs: any;
  existEmail:any=false;

  get firstname() {
    return this.registerForm.get('firstname')
  }
  get lastname() {
    return this.registerForm.get('lastname')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }
  get register() {
    return this.registerForm;
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('',[Validators.required])
    }, { validators: passwordValidators });

    $(document).ready(() => {
      //alert('I am Called From jQuery');
      // $(window).on("load", function () {
      $(".loader-wrapper").fadeOut(1000);
      //});
    });
  }
  onSubmit() {
    // console.log("hghh");
    
    this.emailFromUser = this.email.value;
    this.service.enroll(this.registerForm.value).subscribe(res => {
      //console.log(res.feedBack);
      if(res.feedBack=="exist")
      {
        this.submitted =false;
        this.existEmail=true;
        //alert("Email Already Exist");
      }
      else
      {
        //console.log(res.token)
        //this.route.navigate(['/verify',res.token])
        
        this.submitted=true;
        this.existEmail=false;
      }

    });
    
  }
  onFocus()
  {
    this.existEmail=false;
  }

}
