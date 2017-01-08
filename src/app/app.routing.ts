import { PizzaorderComponent } from './components/pizzaorder/pizzaorder.component';
import { PIZZAORDER_ROUTES } from './components/pizzaorder/pizzaorder.routes';
import { AuthGuard } from './services/auth.guard';
import { ContactComponent } from './components/contact/contact.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { ChatComponent } from './components/chat/chat.component';
import { Routes, RouterModule } from '@angular/router';
import { PIZZA_ROUTES } from './components/pizzas/pizzas.routes';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'pizzas', component: PizzasComponent, children:PIZZA_ROUTES, canActivate: [AuthGuard] },
    { path: 'pizzaorder', component: PizzaorderComponent, children:PIZZAORDER_ROUTES },
    { path: 'contact', component: ContactComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'chat', component: ChatComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);