import { Category } from '../../../models/category';
import { PizzaService } from '../../pizzas/pizza.service';
import { Pizza } from '../../../models/pizza';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizzaorder-list',
  templateUrl: './pizzaorder-list.component.html'
})
export class PizzaorderListComponent implements OnInit {

  pizzas: Pizza[];
  categories: Category[];
  filteredPizzas: Pizza[];
  public oneAtATime: boolean = true;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {

    this.pizzaService.getPizzasFromFB();

    this.pizzas = this.pizzaService.getPizzas();
    this.pizzaService.pizzasChanged.subscribe(
      (pizzas: Pizza[]) => this.pizzas = pizzas
    );

    this.pizzaService.getCategoriesFromFBPromise().then(category => {
      this.categories = category;
      this.pizzaService.getPizzasOrderFromFBPromise().then(pizza => {
        this.pizzas = this.filteredPizzas = pizza;
      });
    });
  }

  selectCategory(category: Category) {
    this.filteredPizzas = this.pizzas.filter(p => p.category === category.name);
    console.log(this.filteredPizzas);
  }

  getstuff() {
    this.pizzaService.getPizzasFromFB();
  }
}
