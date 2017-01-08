import { PizzaService } from '../pizza.service';
import { EventEmitter } from '@angular/forms/src/facade/async';
import { Pizza } from '../../../models/pizza';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html'
})
export class PizzaListComponent implements OnInit {

  pizzas: Pizza[] = [];

  // @Output() selectedPizza = new EventEmitter<Pizza>();
  // pizza = new Pizza('Hawaii', 'Hawaii', 'http://hawaiipizzeria.com/uploads/images/pizza_large.png');

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaService.getPizzasFromFB();
    
    this.pizzas = this.pizzaService.getPizzas();
    this.pizzaService.pizzasChanged.subscribe(
      (pizzas: Pizza[]) => this.pizzas = pizzas
    );
  }

  // onSelected(pizza: Pizza){
  //   this.selectedPizza.emit(pizza);
  // }

}
