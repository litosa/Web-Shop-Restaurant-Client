import { Observable } from 'rxjs/Rx';
import { Category } from '../../models/category';
import { Headers, Http, Response } from '@angular/http';
import { Ingredient } from '../../models/ingredient';
import { Pizza } from '../../models/pizza';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class PizzaService {

  // private pizzas: Pizza[] = [
  //   new Pizza('Hawaii',50, 'http://hawaiipizzeria.com/uploads/images/pizza_large.png', 'Ordinarie Pizzor', [
  //     new Ingredient('Pineapple', 20),
  //     new Ingredient('Ham', 20)
  //   ]),
  //   new Pizza('Capricciosa', 45, 'http://listor.se/wp-content/uploads/2014/02/capricciosa.jpg', 'Kyckling Pizzor', [
  //     new Ingredient('Mushroom', 15),
  //     new Ingredient('Ham', 20)
  //   ])
  // ];
  // private categories: Category[] = [
  //     new Category('Ordinarie Pizzor'),
  //     new Category('Kyckling Pizzor'),
  //     new Category('Skaldjurs Pizzor'),
  //     new Category('Kebab Pizzor'),
  //     new Category('Oxfilé Pizzor'),    
  //     new Category('Mexikanska Pizzor'),
  //     new Category('Mozzarella Pizzor'),
  //     new Category('Special Pizzor'),
  //     new Category('Kebabrätter'),
  //     new Category('Hamburgare'),
  //     new Category('Pastarätter'),
  //     new Category('Sallader'),
  //     new Category('Grekiska Rätter')
  // ];
  private categories: Category[] = [];

  private pizzas: Pizza[] = [];
  private orderedPizzas: Pizza[] = [];

  pizzaPrice: number;
  totalPrice: number = 0;

  pizzasChanged = new EventEmitter<Pizza[]>();
  orderChanged = new EventEmitter<Pizza[]>();
  priceChanged = new EventEmitter<number>();

  constructor(private http: Http) { }


  orderPizzas(pizza: Pizza) {
    this.orderedPizzas.push(pizza);
    this.orderChanged.emit(this.orderedPizzas);
  }
  removeOrderPizzas(pizza: Pizza) {
    this.orderedPizzas.splice(this.orderedPizzas.indexOf(pizza), 1);
    if (this.orderedPizzas.length !== 0) {
      this.totalPrice = 0;
      for (var i = 0; i < this.orderedPizzas.length; i++) {
        this.pizzaPrice = this.orderedPizzas[i].price;
        this.totalPrice += this.pizzaPrice;
      }
    }
    else {
      this.totalPrice = 0;
    }
    this.orderChanged.emit(this.orderedPizzas);
    this.priceChanged.emit(this.totalPrice);
  }
  getOrderedPizza() {
    return this.orderedPizzas;
  }


  getPizzas() {
    return this.pizzas;
  }
  getPizza(pizzaName: string) {
    return this.pizzas.find(p => p.name === pizzaName);
    // return this.pizzas[id];
  }
  addPizza(newPizza: Pizza) {
    // if(this.pizzas === []){
    // this.pizzas.push(newPizza);
    // }
    this.pizzas.push(newPizza);
  }
  editPizza(oldPizza: Pizza, newPizza: Pizza) {
    this.pizzas[this.pizzas.indexOf(oldPizza)] = newPizza;
  }
  deletePizza(pizza: Pizza) {
    this.pizzas.splice(this.pizzas.indexOf(pizza), 1);
  }


  addPizzaToFB() {
    const body = JSON.stringify(this.pizzas);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://pizzeria-c84ec.firebaseio.com/pizzas.json', body, { headers: headers });
  }
  getPizzasFromFB() {
    return this.http.get('https://pizzeria-c84ec.firebaseio.com/pizzas.json')
      .map((response: Response) => response.json())
      //Putting subscribe here beacuse i want to share pizzas array threw multiple components.
      //In case of using the pizzas array in only one related html, put subscribe in that related component
      .subscribe(
      (data: Pizza[]) => {
        this.pizzas = data;
        this.pizzasChanged.emit(this.pizzas);
      });
  }


  getCategories() {
    return this.categories;
  }
  addCategoryToFB() {
    const body = JSON.stringify(this.categories);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://pizzeria-c84ec.firebaseio.com/categories.json', body, { headers: headers });
  }
  getCategoriesFromFB(): Observable<Category[]> {
    return this.http.get('https://pizzeria-c84ec.firebaseio.com/categories.json')
      .map((response: Response) => response.json());
  }
  getCategoriesFromFBPromise(): Promise<Category[]> {
    return this.http.get('https://pizzeria-c84ec.firebaseio.com/categories.json')
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }


  getPizzasOrderFromFB(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-c84ec.firebaseio.com/pizzas.json')
      .map((response: Response) => response.json());
  }
  getPizzasOrderFromFBPromise(): Promise<Pizza[]> {
    return this.http.get('https://pizzeria-c84ec.firebaseio.com/pizzas.json')
      .toPromise()
      .then(response => response.json() as Pizza[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
