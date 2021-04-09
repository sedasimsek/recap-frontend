import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rental-detail';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: Car;
  rentalsByCarId: RentalDetail;
  carImages: CarImage[] = [];
  rentals: Rental[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private carDetailService: CarDetailService,
    private rentalService: RentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.getRentalByCarId(params['carId']);
      }
      this.getRentals();
    });
  }

  getCarsById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetails = response.data[0];
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

  getRentalByCarId(carId: number) {
    this.rentalService.getRentalByCarId(carId).subscribe((response) => {
      this.rentalsByCarId = response.data;
    });
  }

  check(id: number) {
    this.rentals.find(function (element) {
      if (element.carId === id && element.returnDate === null) {
        return false; // Araç kiralanamaz
      } else {
        return true; // Araç kiralanabilir
      }
    });
  }

  checkAdminRole() {
    if (this.authService.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
