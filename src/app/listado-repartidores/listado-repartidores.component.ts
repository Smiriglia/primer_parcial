import { Component, EventEmitter, inject, Output } from '@angular/core';
import RepartidorInterface from '../interfaces/repartidor.interface';
import { FirestoreService } from '../services/firestore.service';
import { RepartidorService } from '../services/repartidor.service';

@Component({
  selector: 'app-listado-repartidores',
  standalone: true,
  imports: [],
  templateUrl: './listado-repartidores.component.html',
  styleUrl: './listado-repartidores.component.css'
})
export class ListadoRepartidoresComponent {
  repartidorService = inject(RepartidorService);
  repartidores : RepartidorInterface[] = [];
  selectedRepartidor : RepartidorInterface | null = null;
  @Output() onSelect = new EventEmitter<RepartidorInterface>();

  constructor() {
    this.repartidorService.getRepartidores()
    .subscribe(
      {
        next: (repartidores) => {
          this.repartidores = repartidores;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  
  select(repartidor : RepartidorInterface) {
    this.selectedRepartidor = repartidor;
    this.onSelect.emit(repartidor);
  }
}
