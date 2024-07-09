import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHeladosComponent } from './lista-helados.component';

describe('ListaHeladosComponent', () => {
  let component: ListaHeladosComponent;
  let fixture: ComponentFixture<ListaHeladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHeladosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaHeladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
