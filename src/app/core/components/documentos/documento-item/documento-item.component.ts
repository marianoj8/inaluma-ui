import { Component, Input } from "@angular/core";
import { Agendamento } from "src/app/core/model/Agendamento";
import { DocumentoAbstato } from "src/app/core/model/DocumentoAbstrato";

@Component({
  selector: 'app-documento-item',
  templateUrl: './documento-item.component.html'
})
export class DocumentoItemComponent {
  /* DEPENDENCIES */

  /* MEMBERS */
  @Input() documento: DocumentoAbstato;

  public get isAgendamento(): boolean { return this.documento instanceof Agendamento; }
}
