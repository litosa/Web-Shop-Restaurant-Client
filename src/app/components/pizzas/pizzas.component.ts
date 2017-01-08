import { PizzaService } from './pizza.service';
import { Pizza } from '../../models/pizza';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html'
})
export class PizzasComponent implements OnInit {

  // selectedPizza: Pizza;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {

  }

}
