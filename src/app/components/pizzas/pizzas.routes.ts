import { PizzaEditComponent } from './pizza-crud/pizza-edit.component';
import { PizzaDetailComponent } from './pizza-crud/pizza-detail.component';
import { PizzaStartComponent } from './pizza-start.component';
import { Routes } from '@angular/router';

//This will come after routeparam pizza/...
export const PIZZA_ROUTES: Routes = [
    { path: '', component: PizzaStartComponent },
    { path: 'new', component: PizzaEditComponent },
    { path: ':pizzaName', component: PizzaDetailComponent },
    { path: ':pizzaName/edit', component: PizzaEditComponent }
];