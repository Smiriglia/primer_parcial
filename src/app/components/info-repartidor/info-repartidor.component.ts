import { Component, Input } from '@angular/core';
import RepartidorInterface from '../../interfaces/repartidor.interface';

@Component({
  selector: 'app-info-repartidor',
  standalone: true,
  imports: [],
  templateUrl: './info-repartidor.component.html',
  styleUrl: './info-repartidor.component.css'
})
export class InfoRepartidorComponent {
  @Input() repartidor!: RepartidorInterface;
}
