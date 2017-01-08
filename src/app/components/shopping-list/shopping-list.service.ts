import { Ingredient } from '../../models/ingredient';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients() {
    return this.ingredients;
  }

  // orderIngredients(ingredients: Ingredient[]) {
  //   //this option is used when receive multiple ingredients
  //   Array.prototype.push.apply(this.ingredients, ingredients);
  // }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }

  editIngredient(oldIngredient: Ingredient, newIngredient) {
    this.ingredients[this.ingredients.indexOf(oldIngredient)] = newIngredient;
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

}
