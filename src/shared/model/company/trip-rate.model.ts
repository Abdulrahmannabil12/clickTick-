import { VehicleRate } from "./vehicle-rate.model";

export class TripRate{
    //id: number;
    zoneId: number;
    zoneName: string;
    vehicleRates: Array<VehicleRate>;
}