import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // modelo de clase
  heroe = new HeroeModel();

  constructor() { }

  ngOnInit() {
  }

}
