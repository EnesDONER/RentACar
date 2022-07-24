import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[] = [];
  dataLoaded=false;
  filterText="";
  constructor(
    private carservice:CarService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else{ this.getCars()}
    })
  }
  
  getCars(){
    this.carservice.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    });
  }
  getCarsByColor(colorId:number){
    this.carservice.getCarsByColor(colorId).subscribe(response=>{this.cars=response.data
    this.dataLoaded=true;});
  }
  getCarsByBrand(brandId:number){
    this.carservice.getCarsByBrand(brandId).subscribe(response=>{this.cars=response.data
    this.dataLoaded=true;
   })
  }
  addToCart(car:Car){
    if(car.id==11){
      this.toastrService.error("Hata,Bu araç kiralanamaz.")
    }
    else{
      this.toastrService.success("Kiralandı "+car.brandName+"("+car.description+")");
      this.cartService.addToCart(car);
    }
  }
}
