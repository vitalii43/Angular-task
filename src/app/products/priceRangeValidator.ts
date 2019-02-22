import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const priceRangeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const min = parseInt(control.get('minPrice').value, 10);
    const max = parseInt(control.get('maxPrice').value, 10);

    return min && max && min > max ? { priceRange: true } : null;
  };


