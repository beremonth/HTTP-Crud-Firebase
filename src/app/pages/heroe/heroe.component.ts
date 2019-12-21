import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // modelo de clase
  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService  )
  { 
  }

  ngOnInit() {
  }

  // Funcion que responde el evento click del html
  // recibe como parametro el formulario incrustado en el html
  guardar( form: NgForm )
  {

    // validamos que la propiedad invalid del formulario, sea true
    if (form.invalid) {
      console.log("Formulario no valido");
      return; // rompemos el flujo del formulario
    }

    // actualizar registro
    if (this.heroe.id)
    { 
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( respuestaHereo =>
        {
          console.log(respuestaHereo);
        });
    } // end actualizar

    // crear registro
    else {
      this.heroesService.crearHeroe( this.heroe )
        .subscribe( respuestaHereo =>
        {
          console.log(respuestaHereo);
          this.heroe = respuestaHereo;
        });
    } // end crear registro
  } // end method guardar
} // end class HeroeComponent
