import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
 ngOnInit()
 {
  $(document).ready(() => {
    //alert('I am Called From jQuery');
    // $(window).on("load", function () {
    $(".loader-wrapper").fadeOut(2000);
    //});
  });
 }
}
