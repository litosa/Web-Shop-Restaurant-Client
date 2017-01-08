import { Pizza } from '../../../models/pizza';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizzaorder-item',
  templateUrl: './pizzaorder-item.component.html'
})
export class PizzaorderItemComponent {
  
  @Input() pizza: Pizza;
  @Input() pizzaName: number;

}
