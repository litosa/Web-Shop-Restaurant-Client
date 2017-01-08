import { PizzaService } from '../pizzas/pizza.service';
import { Pizza } from '../../models/pizza';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit {

  pizzas: Pizza[] = [];
  pizzaPrice: number;
  totalPrice: number = 0;

  // ingredients: Ingredient[] = [];
  selectedIngredient: Ingredient = null;
  selectedPizza: Pizza = null;

  constructor(private shoppingListService: ShoppingListService,
    private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzas = this.pizzaService.getOrderedPizza();
    // this.ingredients = this.shoppingListService.getIngredients();

    for(var i = 0; i < this.pizzas.length; i++) {
      this.totalPrice += this.pizzas[i].price;
      // this.totalPrice += this.pizzaPrice;
    }

    this.pizzaService.priceChanged.subscribe(
      (totalPrice: number) => this.totalPrice = totalPrice
    );
  }

  onSelectIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }

  onSelectPizza(pizza: Pizza) {
    this.selectedPizza = pizza;
  }

  onCleared() {
    this.selectedIngredient = null;
  }

  onRemoveFromShoppingList(pizza: Pizza) {
    this.pizzaService.removeOrderPizzas(pizza);
    // this.shoppingListService.orderIngredients(this.selectedPizza.ingredients);
  }

   openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Pizzeria Skaftö',
      description: 'Betalning',
      amount: this.totalPrice * 100
    });

  }

}
