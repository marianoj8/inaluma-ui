import { FormControl, FormGroupDirective, NgForm, ValidationErrors } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { usernameRegExp } from "../regexp/regexp-rules";

/** Triggers validation only when is dirty, touched, or form has submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return (
      control && control.invalid
      && (control.dirty || /* control.touched || */ isSubmitted)
    );
  }
}

export function InvalidUsername(control: FormControl): ValidationErrors | null {
  const test = !usernameRegExp.test(control.value);
  return test ? { matchProperty: { value: control.value } } : null;
}
