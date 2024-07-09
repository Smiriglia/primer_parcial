import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarHeladoComponent } from './eliminar-helado.component';

describe('EliminarHeladoComponent', () => {
  let component: EliminarHeladoComponent;
  let fixture: ComponentFixture<EliminarHeladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarHeladoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarHeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
