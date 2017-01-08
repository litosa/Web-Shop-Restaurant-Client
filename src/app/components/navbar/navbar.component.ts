import { Auth } from '../../services/auth.service';
import { Pizza } from '../../models/pizza';
import { PizzaService } from '../pizzas/pizza.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private pizzaService: PizzaService, private auth: Auth) { }

  pizzas: Pizza[] = []
  orderQuantity: number;

  ngOnInit() {        
    this.pizzas = this.pizzaService.getOrderedPizza();
    this.pizzaService.orderChanged.subscribe(
      (pizzas: Pizza[]) => this.orderQuantity = pizzas.length
    );
  }

  // onAddPizzaFB() {
  //   this.pizzaService.addPizzaToFB().subscribe(
  //     data => console.log(data)
  //   )
  // }

  // onGetPizzasFB() {
  //   this.pizzaService.getPizzasFromFB();
  // }


}
