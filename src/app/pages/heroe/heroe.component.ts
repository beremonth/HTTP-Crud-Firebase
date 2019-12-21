import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';



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

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información', 
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    // actualizar registro
    if (this.heroe.id)
    {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } // end actualizar

    // crear registro
    else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    } // end crear registro


    // muestra alerta hasta que se recibe una respuestaa
    peticion.subscribe(res =>
    { 
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    }); // end subscribcion peticion

  } // end method guardar
} // end class HeroeComponent
