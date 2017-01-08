import { Pizza } from '../../models/pizza';
import { PizzaService } from '../pizzas/pizza.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizzaorder',
  templateUrl: './pizzaorder.component.html'
})
export class PizzaorderComponent implements OnInit {

  constructor(private pizzaService: PizzaService) { }

  // @Input() selectedPizza: Pizza;


  ngOnInit() {
  }

}
