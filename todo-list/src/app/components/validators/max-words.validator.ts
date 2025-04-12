import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxWordsValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const wordsCount = control.value.trim().split(/\s+/).length;

    if (wordsCount > maxWords) {
      return { maxWords: true };
    }

    return null;
  };
}
