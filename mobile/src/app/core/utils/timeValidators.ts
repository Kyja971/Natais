import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function timeValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Pas de validation si la valeur est vide
    }
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
      return { invalidTime: true }; // Retourne un objet d'erreur
    }
    return null;
  }