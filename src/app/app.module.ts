import { PizzaorderStartComponent } from './components/pizzaorder/pizzaorder-start.component';
import { AuthGuard } from './services/auth.guard';
import { routing } from './app.routing';
import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { PizzaService } from './components/pizzas/pizza.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoComponent } from './components/video/video.component';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { PizzaListComponent } from './components/pizzas/pizza-list/pizza-list.component';
import { PizzaItemComponent } from './components/pizzas/pizza-list/pizza-item.component';
import { PizzaDetailComponent } from './components/pizzas/pizza-crud/pizza-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListCreateComponent } from './components/shopping-list/shopping-list-crud/shopping-list-create.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ContactComponent } from './components/contact/contact.component';
import { PizzaEditComponent } from './components/pizzas/pizza-crud/pizza-edit.component';
import { PizzaStartComponent } from './components/pizzas/pizza-start.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { Auth } from './services/auth.service';
import { PizzaorderComponent } from './components/pizzaorder/pizzaorder.component';
import { PizzaorderListComponent } from './components/pizzaorder/pizzaorder-list/pizzaorder-list.component';
import { PizzaorderItemComponent } from './components/pizzaorder/pizzaorder-list/pizzaorder-item.component';
import { PizzaorderDetailComponent } from './components/pizzaorder/pizzaorder-crud/pizzaorder-detail.component';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ChatComponent } from './components/chat/chat.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VideoComponent,
    PizzasComponent,
    PizzaListComponent,
    PizzaItemComponent,
    PizzaDetailComponent,
    ShoppingListComponent,
    ShoppingListCreateComponent,
    DropdownDirective,
    ContactComponent,
    PizzaEditComponent,
    PizzaStartComponent,
    PizzaorderComponent,
    PizzaorderListComponent,
    PizzaorderItemComponent,
    PizzaorderDetailComponent,
    PizzaorderStartComponent,
    ChatComponent,
    CustomFormComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPgDzghzSePv9s74fX7yNcam_-mWUiESs'
    }),
    AccordionModule.forRoot()
  ],
  providers: [PizzaService, ShoppingListService, AUTH_PROVIDERS, Auth, AuthGuard, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
