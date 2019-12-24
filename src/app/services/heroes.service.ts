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

  borrarHeroe( id )
  { 
    return this.http.delete( `${this.url}/heroes/${id}/.json` )
  } // end method borrarHeroe

  crearHeroe( heroe: HeroeModel )
  {

    // peticion post (crear), como body, mandamos el modelo de heroe
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe( 
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        }));
  } // end method crearHeroe

  obtenerHeroes()
  { 
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(  this.crearArreglo ) // implicitamente la respuesta regresada por el servicio, es el que ejecuta la llamada a crearArreglo
       );
  } // end method getHeroes

  actualizarHeroe( heroeM: HeroeModel )
  {

    // copia del model: HeroeModel, (rompemos referencia de JS)
    const heroeTemp =
    {
      ...heroeM
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroeM.id}.json`, heroeTemp);
  } // end actualizarHeroe

  obtenerHeroe(id: string)
  {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  } // end obtenerHeroe

  private crearArreglo(heroesObj: object)
  {
    const miModeloHeroes: HeroeModel[] = [];
    console.log(heroesObj);

    // validación por si no tengo nada en la base de datos
    if (heroesObj === null) {
      return [];
    } // end if

    // continua si hay registros en la base de datos
    else {
      Object.keys(heroesObj).forEach(key =>
      {
        const heroe: HeroeModel = heroesObj[key]; // accediendo al contenido de cada Key en el objeto json
        heroe.id = key;

        miModeloHeroes.push(heroe);
      });

      return miModeloHeroes;
    } // end else
  } // end crearArreglo

  

} // end class HeroesService
