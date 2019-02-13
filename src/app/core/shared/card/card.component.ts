import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product-list';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() productDetails: Product;

  constructor() { }

  ngOnInit() {

  }

}
