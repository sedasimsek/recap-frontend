export interface Car{
  carId:number;
  colorId: number;
  brandId: number;
  brandName?: string;
  colorName: string;
  imagePath: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  minFindexScore?: number;
  rentalStatu?: boolean;
}