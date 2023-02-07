import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fooditems } from '../models/fooditems.model';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.css']
})
export class FooditemsComponent implements OnInit{
  @Input() fooditem: Fooditems;
  @Output() onRemoveFooditem= new EventEmitter<number>();
  @Output() onEditFooditem= new EventEmitter<number>();

  constructor(){
    this.fooditem={
      foodname: '',
      price: 0,
      profile: '',

    };

  }
  ngOnInit(): void {
    console.log(this.fooditem);
  }
  deleteFooditemClicked(){
    this.onRemoveFooditem.emit(this.fooditem.id);
  }
  editFooditemClicked(){
    console.log(this.fooditem);
    this.onEditFooditem.emit(this.fooditem.id);
  }
   

}
