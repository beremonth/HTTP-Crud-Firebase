import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // modelo de clase
  heroe = new HeroeModel();

  constructor()
  { 
  }

  ngOnInit() {
  }

  // Funcion que responde el evento click del html
  // recibe como parametro el formulario incrustado en el html
  guardar(form: NgForm)
  {

    // validamos que la propiedad invalid del formulario, sea true
    if (form.invalid) {
      console.log("Formulario no valido");
      return; // rompemos el flujo del formulario
    }

    // propiedad invalid = false, continua el flujo
    else {
      console.log(form);
      console.log(this.heroe);
    }
  }
}
