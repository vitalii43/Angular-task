import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FilterDetails } from '../entities';
import { priceRangeValidator } from '../priceRangeValidator';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent implements OnInit, OnDestroy {

  @Output() filterChanges = new EventEmitter<FilterDetails>();
  public filterForm: FormGroup;
  private changes$: Observable<any>;
  private changesSubscription;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      minPrice: ['', Validators.pattern(/^[0-9]*$/)],
      maxPrice: ['', Validators.pattern(/^[0-9]*$/)],
      color: ['']
    }, {
      validators: priceRangeValidator
    });

    this.changes$ = this.filterForm.valueChanges.pipe(
      debounceTime(500)
    );

    this.changesSubscription = this.changes$.subscribe( (val: FilterDetails) => {
      console.log(this.filterForm.valid);
      if (this.filterForm.valid) {
        this.filterChanges.emit(val);
      }
    });
  }


  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
  }
}
