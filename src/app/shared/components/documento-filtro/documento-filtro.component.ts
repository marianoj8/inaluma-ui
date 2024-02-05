import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-documento-filtro',
  templateUrl: './documento-filtro.component.html'
})
export class DocumentoFiltroComponent {
  /* DEPENDENCIES */
  private readonly _formBuilder = inject(FormBuilder);

  /* MEMBERS */
  public filterForm: FormGroup;

  constructor() {
    this.filterForm = this._formBuilder.group({
      estado: new FormControl<string>(null),
      data: new FormControl<Date>(null),
      cliente: new FormControl<number>(null),
      funcionario: new FormControl<number>(null)
    });
  }
}
