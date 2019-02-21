import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const priceRangeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const min = control.get('minPrice').value;
    const max = control.get('maxPrice').value;

    return min && max && min > max ? { priceRange: true } : null;
  };


