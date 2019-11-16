import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 // public url: String;


  constructor(private route:ActivatedRoute) {
//    this.url = route._futureSnapshot.routeConfig.path;
  //  console.log(route._futureSnapshot.routeConfig.path);

  }

  ngOnInit() {

    //console.log(this.url);

  }

}
