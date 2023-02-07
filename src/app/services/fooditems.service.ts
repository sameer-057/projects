import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fooditems } from '../models/fooditems.model';

@Injectable({
  providedIn: 'root'
})
export class FooditemsService {
  baseUrl= 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getFooditems() {
    return this.http.get<Fooditems[]>(this.baseUrl);
  }

  postFooditems(fooditem: Fooditems) {
    return this.http.post<Fooditems>(this.baseUrl, fooditem);
  }

  deleteFooditems(id: string){
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
