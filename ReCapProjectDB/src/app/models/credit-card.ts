export interface Payment{
    paymentId:number;
    customerId:number;
    nameOnTheCard:string;
    cardNumber:string;
    dateMonth:number;
    dateYear:number;
    cvvCode:number;
    expirationDate:string;
}