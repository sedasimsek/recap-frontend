import { CarImage } from "./carImage";

export interface Car{
    carId: number
    colorId: number
    brandId: number
    colorName: string
    brandName: string
    modelYear: number
    dailyPrice: number
    description: string
    imagePath:string
    carImages : CarImage[]
    minFindexScore?:number
  }