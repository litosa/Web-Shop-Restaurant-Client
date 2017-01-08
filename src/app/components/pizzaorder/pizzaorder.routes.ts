import { PizzaorderDetailComponent } from './pizzaorder-crud/pizzaorder-detail.component';
import { PizzaorderStartComponent } from './pizzaorder-start.component';
import { Routes } from '@angular/router';

//This will come after routeparam pizza/...
export const PIZZAORDER_ROUTES: Routes = [
    { path: '', component: PizzaorderStartComponent },
    { path: ':pizzaName', component: PizzaorderDetailComponent }
];