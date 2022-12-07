import { Base } from '../base.model';
export class Vehicle extends Base {
  vehicleCode: string;
  vehicleNumber: string;
  companyId: string;
  companyModelId?: number;
  HrCode: string;
  driverId: string;
  vehicleLicenseNo: string;
  vehicleLicenseIssuingDate: Date;
  vehicleLicenseExpiryDate: Date;
  vehicleTypeId: number;
  Capacity: string;
  VehicleVolume: string;
  vehicleModel: string;
  vehicleBrandId: string;
  vehicleChaseNo: string;
  trafficOffice: string;
  lastKilometer: number;
  driver: any;
  companyName: any;
   constructor() {
    super();
    this.vehicleCode = '';
    this.vehicleNumber = '';
    this.companyId = '';
    this.companyModelId = null;
    this.HrCode = '';
    this.driverId = '';
    this.vehicleLicenseNo = '';
    this.vehicleLicenseIssuingDate = null;
    this.vehicleLicenseExpiryDate = null;
    this.vehicleTypeId = null;
    this.Capacity = '';
    this.VehicleVolume = '';
    this.vehicleModel = '';
    this.vehicleBrandId = '';
    this.vehicleChaseNo = '';
    this.trafficOffice = '';
    this.lastKilometer = null;
  }
}
