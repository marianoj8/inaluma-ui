import { DIALOG_CONTROLS } from "src/app/shared/config";

export interface IDialogsConfig {
  title: string;
  message: string;
  controls: DIALOG_CONTROLS;
  isNegativeWarn: boolean;
}
