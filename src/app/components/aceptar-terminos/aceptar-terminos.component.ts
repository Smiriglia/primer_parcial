import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-aceptar-terminos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './aceptar-terminos.component.html',
  styleUrl: './aceptar-terminos.component.css'
})
export class AceptarTerminosComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  form!: FormGroup;
  loaderState = {
    state: 'loading',
    loading: false,
  }

  ngOnInit(): void {
    this.form = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.form.get('email');
  }

  aceptarTerminos() {
    if(this.form.valid)
    {
      this.loaderState.loading = true;
      this.authService.aceptarTerminos()
      ?.then(
        () => {
          this.loaderState.state = "check";
        }
      )
      .catch(
        () => {
          this.loaderState.state = "wrong";
            setTimeout(
              () => {
                this.loaderState.state = "loading";
                this.loaderState.loading = false;
              },
              1500,
            );
        }
      );
    }
  }
}
