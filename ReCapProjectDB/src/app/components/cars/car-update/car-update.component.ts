import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm!: FormGroup;
  carDetails: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  brand: Brand;
  color: Color;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carDetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarsById(params['id']);
      }
      this.createCarUpdateForm();
      this.getBrands();
      this.getColors();
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          //this.router.navigate(['/list']);
        },
        (responseError) => {
          console.log(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Form Eksik', 'Dikkat');
    }
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
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

  getCarsById(carId:number){
    this.carDetailService.getCarDetailById(carId).subscribe(response=>{
      this.carDetails=response.data[0];
    })
  }

  default(){
    this.carUpdateForm.patchValue({
      carId:this.carDetails.carId,
      brandId:this.carDetails.brandId,
      colorId:this.carDetails.colorId,
      modelYear:this.carDetails.modelYear,
      dailyPrice: this.carDetails.dailyPrice,
      description:this.carDetails.description
    })
  }
}
