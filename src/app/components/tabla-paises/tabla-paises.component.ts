import { Component, EventEmitter, Output, inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { PaisInterface } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css'
})
export class TablaPaisesComponent {
  @Output() onSelect = new EventEmitter<PaisInterface>();
  paisesService = inject(PaisesService); 
  paisesEuropa : PaisInterface[] = [];
  paisesAfrica : PaisInterface[] = [];
  selected : PaisInterface | null = null;
  loaderState = {
    loading: false,
    state: "loading"
  }
  constructor () {
    this.getCountries();
  }

  getCountries() {
    this.loaderState.loading = true;
    this.paisesService.getCountries('europe')
    .subscribe(
      {
        next: (paises) => {
          this.paisesEuropa = paises;
          this.loaderState.loading = false;
        },
        error: (err) => {
          this.loaderState.state = "wrong";
        }
      }
    );

    this.paisesService.getCountries('africa')
    .subscribe(
      {
        next: (paises) => {
          this.paisesAfrica = paises;
          this.loaderState.loading = false;
        },
        error: (err) => {
          this.loaderState.state = "wrong";
        }
      }
    );
  }

  sendPais(pais: PaisInterface) {
    this.selected = pais;
    this.onSelect.emit(pais);
  }

}
