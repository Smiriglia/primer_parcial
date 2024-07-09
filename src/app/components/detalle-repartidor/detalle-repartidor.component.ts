import { Component } from '@angular/core';
import { ListadoRepartidoresComponent } from '../../listado-repartidores/listado-repartidores.component';
import RepartidorInterface from '../../interfaces/repartidor.interface';
import { InfoRepartidorComponent } from '../info-repartidor/info-repartidor.component';
import { InfoPaisComponent } from '../info-pais/info-pais.component';

@Component({
  selector: 'app-detalle-repartidor',
  standalone: true,
  imports: [
    ListadoRepartidoresComponent,
    InfoRepartidorComponent,
    InfoPaisComponent,
  ],
  templateUrl: './detalle-repartidor.component.html',
  styleUrl: './detalle-repartidor.component.css'
})
export class DetalleRepartidorComponent {
  selectedRepartidor : RepartidorInterface | null = null;

  onSelect(repartidor : RepartidorInterface) {
    this.selectedRepartidor = repartidor;
  }
}
