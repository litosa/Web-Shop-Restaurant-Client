import { Category } from '../../../models/category';
import { FormControlName } from '@angular/forms/src/directives';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { Pizza } from '../../../models/pizza';
import { Subscription } from 'rxjs/Rx';
import { PizzaService } from '../pizza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../../../services/auth.service';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html'
})

export class PizzaEditComponent implements OnInit, OnDestroy {

  pizzaForm: FormGroup;
  private subscription: Subscription;
  private pizzaIndex: string;
  private pizza: Pizza;
  private isNew = true;
  private categories: Category[] = [];

  constructor(private route: ActivatedRoute, private pizzaService: PizzaService,
    private formBuilder: FormBuilder, private router: Router, private auth:Auth) { }

  ngOnInit() {
    // this.categories = [
    //   new Category('KebabPizzor'),
    //   new Category('VegetariskaPizzor'),
    //   new Category('FiskPizzor'),
    // ];

    this.pizzaService.getCategoriesFromFB().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
    });


    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('pizzaName')) {
          this.isNew = false;
          this.pizzaIndex = params['pizzaName'];
          // this.pizzaIndex = +params['pizzaName'];
          this.pizza = this.pizzaService.getPizza(this.pizzaIndex);
        } else {
          this.isNew = true;
          this.pizza = null;
        }
        this.initForm();
      }
    );
  }

  private initForm() {
    //If isNew
    let pizzaName = '';
    let pizzaImageUrl = '';
    // let pizzaDescription = '';
    let pizzaPrice = 0;
    let pizzaIngredients: FormArray = new FormArray([]);
    let pizzaCategory = '';

    if (!this.isNew) {
      if (this.pizza.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.pizza.ingredients.length; i++) {
          pizzaIngredients.push(
            //Formgroup is like an objekt stored in an objektarray(FormArray)
            new FormGroup({
              //name, amount matches formcontrol in html
              name: new FormControl(this.pizza.ingredients[i].name, Validators.required),
              amount: new FormControl(this.pizza.ingredients[i].amount, [
                Validators.required,
                Validators.pattern("\\d+")
              ])
            })
          );
        }
      }
      pizzaName = this.pizza.name;
      pizzaImageUrl = this.pizza.imageUrl;
      // pizzaDescription = this.pizza.description;
      pizzaCategory = this.pizza.category;
      pizzaPrice = this.pizza.price;
    }
    //name, imageUrl etc matches formcontrol in html
    this.pizzaForm = this.formBuilder.group({
      name: [pizzaName, Validators.required],
      imageUrl: [pizzaImageUrl, Validators.required],
      // description: [pizzaDescription, Validators.required],
      price: [pizzaPrice, Validators.required],
      category: [pizzaCategory, Validators.required],
      ingredients: pizzaIngredients
    });
  }

  onSubmit() {
    const newPizza = this.pizzaForm.value;
    if (this.isNew) {
      this.pizzaService.addPizza(newPizza);
    }
    else {
      this.pizzaService.editPizza(this.pizza, newPizza);
    }
    this.pizzaService.addPizzaToFB().subscribe(
      data => console.log(data)
    )
    // this.pizzaService.addCategoryToFB().subscribe(
    //   data => console.log(data)
    // )
    

  
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  // onAddItem(name: string, amount: string) {
  //   (<FormArray>this.pizzaForm.controls['ingredients']).push(
  //     new FormGroup({
  //       name: new FormControl(name, Validators.required),
  //       amount: new FormControl(amount, [
  //         Validators.required,
  //         Validators.pattern("\\d+")
  //       ])
  //     })
  //   );
  // }
    onAddItem(name: string) {
    (<FormArray>this.pizzaForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required)        
      })
    );
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.pizzaForm.controls['ingredients']).removeAt(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private navigateBack() {
    this.router.navigate(['../pizzas']);
    // this.router.navigate(['../../pizzaorder']); 
  }

}
