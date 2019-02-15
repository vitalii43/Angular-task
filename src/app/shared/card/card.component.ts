import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../core/entities';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: Product;

  constructor() { }

  ngOnInit() {

  }

}
