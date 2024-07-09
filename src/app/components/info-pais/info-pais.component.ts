import { Component, Input } from '@angular/core';
import { PaisInterface } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-info-pais',
  standalone: true,
  imports: [],
  templateUrl: './info-pais.component.html',
  styleUrl: './info-pais.component.css'
})
export class InfoPaisComponent {
  @Input() pais! : PaisInterface;
  
}
