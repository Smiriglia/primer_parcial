import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IHelado } from '../../interfaces/helado.interface';
import { HeladoService } from '../../services/helado.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-eliminar-helado',
  standalone: true,
  imports: [
    LoaderComponent,
  ],
  templateUrl: './eliminar-helado.component.html',
  styleUrl: './eliminar-helado.component.css'
})
export class EliminarHeladoComponent {
  @Input() helado!: IHelado;
  @Output() onUnselect = new EventEmitter<any>();

  heladoService = inject(HeladoService);

  disable = false;

  loaderState = {
    state: 'loading',
    loading: false,
  };

  eliminar() {
    this.disable = true;
    this.loaderState.loading = true;
    this.heladoService.delete(this.helado)
      .then(() => {
        this.loaderState.state = 'check';
        setTimeout(() => {
          this.loaderState.state = 'loading';
          this.loaderState.loading = false;
        },
          500,
        );
        this.onUnselect.emit();
      })
      .catch((err) => {
        console.log(err);
        this.loaderState.state = 'error';
        setTimeout(() => {
          this.loaderState.state = 'loading';
          this.loaderState.loading = false;
        },
          500,
        );
      });
  };

}
