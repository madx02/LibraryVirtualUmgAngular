import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabeza',
  templateUrl: './cabeza.component.html',
  styleUrls: ['./cabeza.component.css']
})
export class CabezaComponent implements OnInit {

  public title: string;


  constructor() {
    this.title = 'Libreria Virtual Umg';

   }

  ngOnInit() {
  }

}
