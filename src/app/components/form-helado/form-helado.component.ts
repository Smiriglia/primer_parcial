import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IHelado } from '../../interfaces/helado.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-helado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-helado.component.html',
  styleUrl: './form-helado.component.css'
})
export class FormHeladoComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IHelado>();
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      sabor: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      tipo: new FormControl("", [Validators.required,]),
      precio: new FormControl("", [Validators.required, Validators.min(1)]),
      peso: new FormControl("", [Validators.required, Validators.min(250), Validators.max(1000)]),
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
    if(this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
