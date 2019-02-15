import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';

@NgModule({
  declarations: [CardComponent, CardsContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [CardsContainerComponent]
})
export class SharedModule { }
