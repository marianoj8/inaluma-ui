import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDialogsConfig } from "src/app/core/model/IDialogsConfig";
import { DIALOG_CONTROLS, DIALOG_RESPONSES } from "../../../config";
import { IDialogsResponses } from "src/app/core/model";

@Component({
  selector: 'app-confirm-sign-out',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  /* DEPENDENCIES */
  private readonly _diagRef = inject<MatDialogRef<ConfirmDialogComponent, IDialogsResponses>>(MatDialogRef);

  /* MEMBERS */
  private readonly _config = inject<IDialogsConfig>(MAT_DIALOG_DATA);

  public negativeReply(): void { this.fecharDialog(this.isYesNo ? DIALOG_RESPONSES.no : DIALOG_RESPONSES.cancel) }
  public positiveReply(): void { this.fecharDialog(this.isYesNo ? DIALOG_RESPONSES.yes : DIALOG_RESPONSES.confirm) }

  public get negativeOption(): string { return this.isConfirmCancel ? 'Cancelar' : 'Não'; }
  public get positiveOption(): string { return this.isConfirmCancel ? 'Confirmar' : 'Sim' }

  fecharDialog(resp: DIALOG_RESPONSES): void { this._diagRef.close({controls: this._config.controls, response: resp}) }

  public get controls(): DIALOG_CONTROLS { return this._config.controls }
  public get isYesNo(): boolean { return this.controls === DIALOG_CONTROLS.yes_no }
  public get isConfirmCancel(): boolean { return this.controls === DIALOG_CONTROLS.confirm_cancel }
  public get message(): string { return this._config.message }
  public get title(): string { return this._config.title }
  public get positiveOptionColor(): string { return this._config.isNegativeWarn ? 'accent' : 'warn'}
  public get negativeOptionColor(): string { return this._config.isNegativeWarn ? 'warn' : 'accent' }
}
