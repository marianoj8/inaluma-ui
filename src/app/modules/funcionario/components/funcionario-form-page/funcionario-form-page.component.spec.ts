import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioFormPageComponent } from './funcionario-form-page.component';

describe('FuncionarioFormPageComponent', () => {
  let component: FuncionarioFormPageComponent;
  let fixture: ComponentFixture<FuncionarioFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionarioFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
