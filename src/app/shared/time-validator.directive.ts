import { AbstractControl } from '@angular/forms';

/**
 * Custom validator function for time in 24-hour format.
 * @param {AbstractControl} control - The form control to validate.
 * @returns {{ [key: string]: boolean } | null} - Returns an error object if the control's value is not a valid time, or null if it is a valid time.
 */
export function timeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const valid = /^([01]\d|2[0-3]):?([0-5]\d)$/.test(control.value);
  return valid ? null : { invalidTime: true };
}
