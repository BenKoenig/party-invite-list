import { AbstractControl } from '@angular/forms';

/**
 * Custom validator function for phone numbers with country code.
 * @param {AbstractControl} control - The form control to validate.
 * @returns {{ [key: string]: boolean } | null} - Returns an error object if the control's value is not a valid phone number, or null if it is a valid phone number.
 */
export function phoneNumberValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const valid = /^\+\d{1,3}\d{10}$/.test(control.value);
  return valid ? null : { invalidPhoneNumber: true };
}
