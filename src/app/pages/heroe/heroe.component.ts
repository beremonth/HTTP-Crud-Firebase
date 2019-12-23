import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // modelo de clase
  heroe = new HeroeModel();

  constructor( private miHeroesService: HeroesService,  private miActivatedRoute: ActivatedRoute )
  { 
  }

  ngOnInit()
  {
    const id = this.miActivatedRoute.snapshot.paramMap.get('id');
    
    if ( id !== 'nuevo' )
    { 
      this.miHeroesService.obtenerHeroe(id)
        .subscribe( (resp: HeroeModel) => {
          
          // asignación de valores para la pantalla de mostrar superheore
          this.heroe = resp;
          this.heroe.id = id;

        });
    } // end if


  } // end ngOnInit

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
      peticion = this.miHeroesService.actualizarHeroe(this.heroe);
    } // end actualizar

    // crear registro
    else {
      peticion = this.miHeroesService.crearHeroe( this.heroe );
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
