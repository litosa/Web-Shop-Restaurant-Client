import { Category } from './category';
import { Ingredient } from './ingredient';
export class Pizza {
    // constructor(public name:string, public price: number, public description:string, public imageUrl:string, public category: string, public ingredients:Ingredient[]) {}
    constructor(public name:string, public price: number, public imageUrl:string, public category: string, public ingredients:Ingredient[]) {}    
}
