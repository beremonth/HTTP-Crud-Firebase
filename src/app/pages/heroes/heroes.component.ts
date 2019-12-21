import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit
{
  
  miHeroeModel: HeroeModel[] = [];

  constructor( private HeroesService: HeroesService ) { } // end constructor

  ngOnInit()
  {
    this.HeroesService.obtenerHeroes()
      .subscribe( resp => this.miHeroeModel = resp );
  } // end ngOnInit

} // end class HeroesComponent
