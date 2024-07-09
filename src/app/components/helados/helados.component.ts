import { Component, inject } from '@angular/core';
import { ListaHeladosComponent } from '../lista-helados/lista-helados.component';
import { IHelado } from '../../interfaces/helado.interface';
import { HeladoService } from '../../services/helado.service';
import { FormHeladoComponent } from '../form-helado/form-helado.component';
import { LoaderComponent } from '../loader/loader.component';
import { ModificarHeladoComponent } from '../modificar-helado/modificar-helado.component';
import { EliminarHeladoComponent } from '../eliminar-helado/eliminar-helado.component';

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [
    ListaHeladosComponent,
    FormHeladoComponent,
    LoaderComponent,
    ModificarHeladoComponent,
    EliminarHeladoComponent,
  ],
  templateUrl: './helados.component.html',
  styleUrl: './helados.component.css'
})
export class HeladosComponent {
  heladoService = inject(HeladoService);
  selectedHelado: IHelado | null = null;

  loaderState = {
    state: 'loading',
    loading: false,
  };

  onSelect(helado: IHelado) {
    this.selectedHelado = helado;
  }

  onUnselect() {
    this.selectedHelado = null;
  }

  onAdd(newHelado: IHelado) {
    this.loaderState.loading = true;
    this.heladoService.addHelado(newHelado)
      .subscribe(
        {
          next: () => {
            this.loaderState.state = 'check';
            setTimeout(() => {
              this.loaderState.state = 'loading';
              this.loaderState.loading = false;
            },
              500,
            );
          },
          error: () => {
            this.loaderState.state = 'error';
            setTimeout(() => {
              this.loaderState.state = 'loading';
              this.loaderState.loading = false;
            },
              500,
            );
          }
        }
      );
  }
}
