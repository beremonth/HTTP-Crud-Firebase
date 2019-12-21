import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroes-06.firebaseio.com';

  constructor( private http: HttpClient ) { }
  
  crearHeroe( heroe: HeroeModel )
  {

    // modelo de heroe
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe( 
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        }));
  } // end method crearHeroe

} // end class HeroesService