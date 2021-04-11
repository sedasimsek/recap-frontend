export interface RentalDetail {
    carId:number;
    rentalId: number;
    customerId: number;
    userName:string;
    brandName:string;
    colorName: string;
    companyName: string;
    carDescription?:string;
    carModel?:number;
    carBrand?:string;
    rentDate: Date;
    returnDate: Date;
  }