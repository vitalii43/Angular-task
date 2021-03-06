import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../entities';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: Product;
  @Input() cardId: string;

  constructor() { }

  ngOnInit() {

  }

}
