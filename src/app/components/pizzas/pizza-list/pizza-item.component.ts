import { Pizza } from '../../../models/pizza';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html'
})
export class PizzaItemComponent {

  @Input() pizza: Pizza;
  @Input() pizzaName: number;

}
