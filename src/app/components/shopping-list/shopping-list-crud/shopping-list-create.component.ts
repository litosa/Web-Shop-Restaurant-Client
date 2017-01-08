import { Pizza } from '../../../models/pizza';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../../models/ingredient';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-list-create',
  templateUrl: './shopping-list-create.component.html'
})

export class ShoppingListCreateComponent implements OnChanges {

  // Connected to ngOnChanges. ngOnChanges listen to changes from outside component
  // @Input() ingredient: Ingredient;
  @Input() pizza: Pizza;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  ingredient = {
    name: '',
    amount: ''
  };

  constructor(private shoppingListService: ShoppingListService) { }

    //Detect the changes when a new pizza fill the Input variabel pizza and rerender the view
    ngOnChanges(changes) {
    if(changes.pizza.currentValue === null) {
      this.isAdd = true;
      // Preventing ingredient variabel binding to be null
      this.pizza = { name: null, price: null, imageUrl: null, category: null, ingredients: null };
    } else {
      console.log(this.pizza)
      this.isAdd = false;
    }
  }

  // ngOnChanges(changes) {
  //   if(changes.ingredient.currentValue === null) {
  //     this.isAdd = true;
  //     // Preventing ingredient variabel binding to be null
  //     this.ingredient = { name: null, amount: null };
  //   } else {
  //     this.isAdd = false;
  //   }
  // }

  // onSubmit(ingredient: Ingredient) {
  //   const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
  //   if(!this.isAdd) {
  //     this.shoppingListService.editIngredient(this.ingredient, newIngredient);
  //     this.onClear();
  //   } else {
  //     this.ingredient = newIngredient;
  //     this.shoppingListService.addIngredient(this.ingredient);
  //   }
  // }

  // onDelete() {
  //   this.shoppingListService.deleteIngredient(this.ingredient);
  //   this.onClear();
  // }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
