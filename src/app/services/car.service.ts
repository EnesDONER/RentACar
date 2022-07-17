import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { Toast, ToastrModule } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44385/api/"
  constructor(private httpClient:HttpClient ,
    private toastr:ToastrModule) { }
  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number){
    let newPath = this.apiUrl +"cars/getcardetailscolorId?id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
