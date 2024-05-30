import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaisInterface } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  http = inject(HttpClient);  
  
  getCountries() : Observable<PaisInterface[]> {
    return this.http.get<Array<any>>('https://restcountries.com/v3.1/all')
    .pipe(
      map((values) => {
        return values.map((val) => {
          const country : PaisInterface = {
            region: val.region,
            official: val.translations.spa.official,
            common: val.translations.spa.common,
            flag: val.flags.png,
            alt: val.flags.alt,
          }
          return country;
        })
      })
    );
  }
}
