import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^\d+(\.\d{1,2})?$/.test(control.value);
    return valid ? null : { 'decimal': { value: control.value } };
  };
}