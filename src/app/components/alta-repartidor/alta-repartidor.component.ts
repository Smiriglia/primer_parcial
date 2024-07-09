import { Component, inject } from '@angular/core';
import { PaisInterface } from '../../interfaces/pais.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaPaisesComponent } from '../tabla-paises/tabla-paises.component';
import { LoaderComponent } from '../loader/loader.component';
import { RepartidorService } from '../../services/repartidor.service';

@Component({
  selector: 'app-alta-repartidor',
  standalone: true,
  imports: [TablaPaisesComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './alta-repartidor.component.html',
  styleUrl: './alta-repartidor.component.css'
})
export class AltaRepartidorComponent {
  repartidorService = inject(RepartidorService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  paisSeleccionado : PaisInterface = {
    region: "",
    alt: "",
    common: "",
    flag: "",
    official: "",
  }
  loaderState = {
    loading: false,
    state: "loading"
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      dni: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(11), Validators.maxLength(11)]),
      edad: new FormControl("", [Validators.required, Validators.min(18)]),
      capacidadTransporte: new FormControl("", [Validators.required, Validators.min(1)]),
      unidad: new FormControl("", [Validators.required]),
      paisOrigen: this.fb.group({
        region: ['', Validators.required],
        official: ['', Validators.required],
        common: ['', Validators.required],
        flag: ['', Validators.required]
      })
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get dni() {
    return this.form.get('dni');
  }

  get edad() {
    return this.form.get('edad');
  }

  get capacidadTransporte() {
    return this.form.get('capacidadTransporte');
  }

  get paisOrigen() {
    return this.form.get('paisOrigen') as FormGroup;
  }

  get unidad() {
    return this.form.get('unidad') as FormGroup;
  }

  seleccionarPais(pais: PaisInterface) {
    this.paisSeleccionado = pais;
    
    Object.keys(this.paisOrigen.controls).forEach(controlName => {
      const control = this.paisOrigen.get(controlName);
      control!.setValue(this.paisSeleccionado[controlName]);
    });
  }

  addRepartidor() {
    if(this.form.valid) {
      this.loaderState.loading = true;
      this.repartidorService.addRepartidor(this.form.value)
      .subscribe(
        {
          next: () => {
            this.loaderState.state = "check";
          },
          error: (err) => {
            this.loaderState.state = "wrong";
            setTimeout(
              () => {
                this.loaderState.state = "loading";
                this.loaderState.loading = false;
              },
              1500,
            )
          }
        }
      )
    }
  }
}
