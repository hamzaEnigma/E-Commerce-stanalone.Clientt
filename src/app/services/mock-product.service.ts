import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Category } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class MockProductService {
  private categories: Category[] = [
    { categoryId: 1, categoryName: "Beverages", description: "Soft drinks, coffees, teas, beers, and ales", picture: undefined },
    { categoryId: 2, categoryName: "Condiments", description: "Sweet and savory sauces, relishes, spreads, and seasonings", picture: undefined },
    { categoryId: 3, categoryName: "Confections", description: "Desserts, candies, and sweet breads", picture: undefined },
    { categoryId: 4, categoryName: "Dairy Products", description: "Cheeses", picture: undefined },
    { categoryId: 5, categoryName: "Grains/Cereals", description: "Breads, crackers, pasta, and cereal", picture: undefined },
    { categoryId: 6, categoryName: "Meat/Poultry", description: "Prepared meats", picture: undefined },
    { categoryId: 7, categoryName: "Produce", description: "Dried fruit and bean curd", picture: undefined },
    { categoryId: 8, categoryName: "Seafood", description: "Seaweed and fish", picture: undefined },
    { categoryId: 9, categoryName: "huiles", description: "huiles d olive", picture: undefined }
  ];


  constructor() {}

  getProducts(): Observable<any[]> {
    return of(MOCK_PRODUCTS);
  }
    getCategories(): Observable<Category[]> {
    return of(this.categories);
  }
}
