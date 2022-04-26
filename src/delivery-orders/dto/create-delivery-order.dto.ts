export class CreateDeliveryOrderDto {
    customerId: number;

    warehouseId: number;

    packageId: number;

    state: number;

    lat: number;
    
    lng: number;

    street: string;

    ward: string;

    district: string;

    city: string;
}