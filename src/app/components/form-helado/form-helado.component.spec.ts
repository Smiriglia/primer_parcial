import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeladoComponent } from './form-helado.component';

describe('FormHeladoComponent', () => {
  let component: FormHeladoComponent;
  let fixture: ComponentFixture<FormHeladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeladoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
