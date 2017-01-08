import { PizzaService } from '../../pizzas/pizza.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Pizza } from '../../../models/pizza';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizzaorder-detail',
  templateUrl: './pizzaorder-detail.component.html'
})
export class PizzaorderDetailComponent implements OnInit {

  private subscription: Subscription;
  private pizzaName: string;

  selectedPizza: Pizza;
  // @Input() selectedPizza: Pizza;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
              private pizzaService: PizzaService, private router: Router) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pizzaName = params['pizzaName'];
        this.selectedPizza = this.pizzaService.getPizza(this.pizzaName);
      }
    );
  }

  onAddToShoppingList() {
    this.pizzaService.orderPizzas(this.selectedPizza);    
    // this.shoppingListService.orderIngredients(this.selectedPizza.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
