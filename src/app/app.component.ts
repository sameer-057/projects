import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Fooditems } from './models/fooditems.model';
import { FooditemsService } from './services/fooditems.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addFooditemButton') addFooditemButton: any;
  title = 'fooditem';

  foodItem: FormGroup;

  fooditems: Fooditems[];
  fooditemstodisplay: Fooditems[];
  foodname: any;
  price: any;

  constructor(private fb: FormBuilder, private fooditemsService: FooditemsService) {

    this.foodItem=fb.group({});
    this.fooditems=[];
    this.fooditemstodisplay= this.fooditems;
  }

  ngOnInit(): void{

    this.foodItem= this.fb.group({
     foodname: this.fb.control(''),
     price: this.fb.control('')
    });

    this.fooditemsService.getFooditems().subscribe(res => {
      for (let emp of res){
        this.fooditems.unshift(emp);
      }
      this.fooditemstodisplay=this.fooditems;
    });
  }

  addFoodItem(){
    let fooditem: Fooditems={
      foodname: this.Foodname.value,
      price: this.Price.value,
      profile: this.fileInput.nativeElement.files[0]?.name,  
    }
    this.fooditemsService.postFooditems(fooditem).subscribe((res)=> {
      this.fooditems.unshift(res);
      this.clearForm();
    })
  }
  removeFooditem(event: any){
    this.fooditems.forEach((val, index) =>{
      if (val.id==parseInt(event)){
        this.fooditemsService.deleteFooditems(event).subscribe((res)=>{
          this.fooditems.splice(index, 1)
        });
      }
    });
  }

  editFooditem(event: any){
    this.fooditems.forEach((val, index)=> {
      if(val.id == event){
        this.setForm(val);
      }
    })
    this.removeFooditem(event);
    this.addFooditemButton.nativeElement.click();
  }

  setForm(food: Fooditems){
    this.Foodname.setValue(food.foodname);
    this.Price.setValue(food.price);
    this.fileInput.nativeElement.value=''; 
  }
  searchFooditems(event: any){
    let filteredFooditems: Fooditems[]= [];

    if(event== ''){
      this.fooditemstodisplay=this.fooditems;
    
    }
    else{
      filteredFooditems= this.fooditems.filter((val, index)=>{
        let targetKey= val.foodname.toLowerCase();
        let searchKey= event.toLowerCase();
        return targetKey.includes(searchKey);
        
      });
      this.fooditemstodisplay= filteredFooditems;
    }
  }

  clearForm(){
    this.Foodname.setValue('');
    this.Price.setValue('');
    this.fileInput.nativeElement.value='';

  }

  
  

  public get Foodname(): FormControl{
    return this.foodItem.get('foodname') as FormControl;
  }

  public get Price(): FormControl{
    return this.foodItem.get('price') as FormControl;
  }


 
}


