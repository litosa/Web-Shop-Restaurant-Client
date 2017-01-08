import { PizzaService } from '../pizza.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Pizza } from '../../../models/pizza';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html'
})

export class PizzaDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private pizzaIndex: string;

  selectedPizza: Pizza;
  // @Input() selectedPizza: Pizza;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
              private pizzaService: PizzaService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pizzaIndex = params['pizzaName'];
        this.selectedPizza = this.pizzaService.getPizza(this.pizzaIndex);
      }
    );
  }

  onEdit() {
    this.router.navigate(['/pizzas', this.pizzaIndex, 'edit'])
  }

  onDelete() {
    this.pizzaService.deletePizza(this.selectedPizza);
    this.pizzaService.addPizzaToFB().subscribe(
      data => console.log(data)
    )
    this.router.navigate(['/pizzas']);
  }

  // onAddToShoppingList() {
  //   this.pizzaService.orderPizzas(this.selectedPizza);    
  //   // this.shoppingListService.orderIngredients(this.selectedPizza.ingredients);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
