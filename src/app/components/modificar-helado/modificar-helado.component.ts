import { Component, inject, Input, input, OnChanges, OnInit } from '@angular/core';
import { IHelado } from '../../interfaces/helado.interface';
import { HeladoService } from '../../services/helado.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-modificar-helado',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './modificar-helado.component.html',
  styleUrl: './modificar-helado.component.css'
})
export class ModificarHeladoComponent implements OnChanges {
  @Input() helado!: IHelado;
  heladoService = inject(HeladoService);

  loaderState = {
    state: 'loading',
    loading: false,
  };

  form!: FormGroup;

  ngOnChanges(): void {
    this.form = new FormGroup({
      sabor: new FormControl(this.helado.sabor, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      tipo: new FormControl(this.helado.tipo, [Validators.required,]),
      precio: new FormControl(this.helado.precio, [Validators.required, Validators.min(1)]),
      peso: new FormControl(this.helado.peso, [Validators.required, Validators.min(250), Validators.max(1000)]),
    });
  }

  get sabor() {
    return this.form.get('sabor');
  }

  get tipo() {
    return this.form.get('tipo');
  }

  get precio() {
    return this.form.get('precio');
  }

  get peso() {
    return this.form.get('peso');
  }

  submit() {
    if (this.form.valid) {
      this.loaderState.loading = true;
      this.heladoService.updateHelado(this.helado, this.form.value)
        .then(() => {
          this.loaderState.state = 'check';
          setTimeout(() => {
            this.loaderState.state = 'loading';
            this.loaderState.loading = false;
          },
            500,
          );
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
}
