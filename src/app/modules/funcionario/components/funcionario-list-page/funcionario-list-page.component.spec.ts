import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioListPageComponent } from './funcionario-list-page.component';

describe('FuncionarioListPageComponent', () => {
  let component: FuncionarioListPageComponent;
  let fixture: ComponentFixture<FuncionarioListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
