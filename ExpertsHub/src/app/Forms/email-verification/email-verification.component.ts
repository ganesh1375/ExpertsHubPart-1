import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/Service/database.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private service:DatabaseService,private route:ActivatedRoute,private http:HttpClient,private router:Router) { }

  token=this.service.getToken();
  alertMessage=false;
  errorMessage=false;
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.token=id;
  }

  onClick()
  {
    this.verifyToken().subscribe(res=>
      {
       if(res.message=="Sign up Successfull")
       {
        this.alertMessage=true;
        this.router.navigate(['/login']);

       }
       else
       {
         this.alertMessage=false;
         this.errorMessage=true;
       }
      })
  }


  verifyToken()
  {
    return this.http.get<any>(`http://localhost:5500/api/verify/${this.token}`);
  }


}
