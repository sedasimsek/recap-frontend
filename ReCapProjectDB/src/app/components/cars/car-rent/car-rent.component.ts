import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { Findex } from 'src/app/models/findex';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rental-detail';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})
export class CarRentComponent implements OnInit {
  findexScore: Findex[] = [];
  cars: Car[] = []
  customers: Customer;
  customerId: number;
  rentDate: Date;
  returnDate!: Date;
  rentDateValue: Date;
  rentalCar: RentalDetail;
  isRentBefore: Boolean = false;

  constructor(
    private carService: CarService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    public authService: AuthService,
    private findexService: FindexService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);

        this.getRentalByCarId(params['carId']);
      }

      this.getFindexScoreByUserId(this.authService.userId);
      this.getCustomerByUserId(this.authService.userId);
    });
  }

  getCustomerByUserId(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      //console.log(response.data)
      //this.customers = response.data;
    });
  }

  checkFindex() {
    if ((this.cars[0]?.minFindexScore) <= (this.findexScore[0]?.findexScore)) {
      return true;
    } else {
      return false;
    }
  }

  getCarsById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getFindexScoreByUserId(userId: number) {
    this.findexService.getFindexScoreByUserId(userId).subscribe((response) => {
      this.findexScore = response.data;
    });
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }

  createRental() {
    let MyRental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate ? this.returnDate : null,
      carId: this.cars[0].carId,
      customerId: this.customers.userId,
    };
    this.paymentService.addToCart(MyRental);
    // console.log(this.paymentService.listCart());

    this.router.navigate(['/payment/']);
    this.toastrService.info(
      '??deme sayfas??na y??nlendiriliyorsunuz..',
      '??deme ????lemleri'
    );
  }

  getRentalByCarId(carId: number) {
    this.rentalService.getRentalByCarId(carId).subscribe((response) => {
      if (response.data == null) {
        this.isRentBefore = false;
      } else {
        this.rentalCar = response.data;
        this.isRentBefore = true;
      }
    });
  }

  checkAvailability() {
    if (!this.isRentBefore) {
      return true;
    } else {
      return this.rentedBeforeCarCheck();
    }
  }

  rentedBeforeCarCheck() {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    let today = formatDate(now, 'yyyy/MM/dd', 'en');
    let oldDate = formatDate(this.rentalCar.returnDate, 'yyyy/MM/dd', 'en');
    if (this.rentalCar.returnDate == null) {
      return false;
    } else if (oldDate > today) {
      return false;
    } else {
      return true;
    }
  }

  checkClick() {
    if (this.checkAvailability() == true) {
      if (this.rentDate == null) {
        this.toastrService.warning(
          'Ba??lang???? tarihi ve ??irket se??imi zorunludur!',
          'Eksik Form'
        );
      } else {
        if (this.returnDate == null || this.returnDate > this.rentDate) {
          this.toastrService.success('Ara?? kiralanabilir.', 'Ara?? Uygun');
          this.createRental();
        } else if (this.returnDate < this.rentDate) {
          this.toastrService.error(
            'D??n???? tarihi ba??lang???? tarihinden k??????k olamaz!'
          );
        } else if (this.returnDate == this.rentDate) {
          this.toastrService.error('Kiralama i??lemi en az 1 g??n olmal??d??r!');
        }
      }
    } else {
      this.toastrService.warning(
        'Ara?? kiralama i??lemi ger??ekle??emez.',
        'Ara?? Kullan??mda'
      );
    }
  }
}
