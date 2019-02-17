import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardComponent, CardsContainerComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CardsContainerComponent]
})
export class SharedModule { }
