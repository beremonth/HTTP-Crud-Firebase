import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit
{
  
  miHeroeModel: HeroeModel[] = [];

  constructor( private miHeroesService: HeroesService ) { } // end constructor

  ngOnInit()
  {
    this.miHeroesService.obtenerHeroes()
      .subscribe( resp => this.miHeroeModel = resp );
  } // end ngOnInit

  borrarHeroe( heroe: HeroeModel, i: number )
  {
    Swal.fire({
      title: 'Confirmar orden',
      text: `Se borrará a ${heroe.nombre} ¿ es correcto ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then(resp =>
      {
        if (resp.value)
        {
          this.miHeroeModel.splice(i, 1); // elimina del model el registro precionda y vuelve a cargar la vista
  
          const id = heroe.id;
          this.miHeroesService.borrarHeroe(id).
            subscribe();
        }
    });

    
  } // end borrarHeroe

} // end class HeroesComponent
