import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars : Car[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];
  dataLoaded = false;
  filterText="";
  //currentCar: Car;

  baseUrl = environment.baseUrl;
  
    constructor(
      private carService:CarService,
      private brandService:BrandService,
      private colorService:ColorService,
      private activatedRoute:ActivatedRoute
      ) { }
  
    ngOnInit(): void {
      this.getBrands();
      this.getColors();
      this.activatedRoute.params.subscribe(params => {
        if(params["brandId"]){
          this.getCarsByBrand(params["brandId"]);
        }else if(params["colorId"]){
          this.getCarsByColor(params["colorId"]);
        }else if(params["brandId"] && params["colorId"]){
          this.getCarsByFilters(params["brandId"],params["colorId"]);
        }else{
          this.getCars();
        }
      })
    }
      
    getCars(){
      this.carService.getCars().subscribe(response => {
        this.cars = response.data,
        this.dataLoaded = true;
      })
    }

    getBrands() {
      this.brandService.getBrands().subscribe((response) => {
        this.brands = response.data;
      });
    }
  
    getColors() {
      this.colorService.getColors().subscribe((response) => {
        this.colors = response.data;
      });
    }
  
    getCarsByBrand(brandId:Number){
      this.carService.getCarsByBrand(brandId).subscribe(response => {
        this.cars = response.data,
        this.dataLoaded = true
      })
    }
  
    getCarsByColor(colorId:Number){
      this.carService.getCarsByColor(colorId).subscribe(response => {
        this.cars = response.data,
        this.dataLoaded = true
      })
    }
  
    getCarsByFilters(brandId:number, colorId: number) {
      this.carService.getCarsByFilters(brandId,colorId).subscribe(response => {
        this.cars = response.data
      }) 
    }
  }
