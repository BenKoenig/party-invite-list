import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator function for forbidden names.
 * @param {RegExp} nameRe - Regular expression to test the control's value against.
 * @returns {ValidatorFn} - A validator function that returns an error object if the control's value matches the regular expression, or null if it doesn't.
 */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
