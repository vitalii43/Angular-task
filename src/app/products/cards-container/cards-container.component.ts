import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../entities';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  @Input() cards: Product[];

  constructor() { }

  ngOnInit() {

  }

}
