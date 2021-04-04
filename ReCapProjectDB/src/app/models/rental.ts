export interface Rental {
    rentalId?: Number;
    carId: Number;
    customerId: Number;
    rentDate: Date;
    returnDate?: Date;
    //rentalStatu:boolean;
  }