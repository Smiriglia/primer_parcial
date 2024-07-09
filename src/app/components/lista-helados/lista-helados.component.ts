import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IHelado } from '../../interfaces/helado.interface';
import { HeladoService } from '../../services/helado.service';

@Component({
  selector: 'app-lista-helados',
  standalone: true,
  imports: [],
  templateUrl: './lista-helados.component.html',
  styleUrl: './lista-helados.component.css'
})
export class ListaHeladosComponent {
  @Output() onSelect = new EventEmitter<IHelado>();
  helados : IHelado[] = [];
  selectedHelado : IHelado | null = null;
  heladoService = inject(HeladoService);

  constructor() {
    this.heladoService.getHelados()
    .subscribe(
      {
        next: (helados) => {
          this.helados = helados;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  select(helado : IHelado) {
    this.selectedHelado = helado;
    this.onSelect.emit(helado);
  }
}
