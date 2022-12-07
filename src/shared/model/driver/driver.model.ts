import { Base } from '../base.model';

export class Driver extends Base {
  UserId: string;
  DriverNameAR: string;
  DriverNameEn: string;
  MobileNo: string;
  LicenseIssuingDate: Date;
  LicenseExpiryDate: Date;
  LicenseNo: string;
  LicenseDegree: string;
  OnlineAccountId: string;
  OnlineAccountPassword: string;
  BranchCode: string;
  DriveCode: string;
  drivingId: number;

  constructor() {
    super();
    this.UserId = null;
    this.DriverNameAR = null;
    this.DriverNameEn = null;
    this.MobileNo = null;
    this.LicenseIssuingDate = null;
    this.LicenseExpiryDate = null;
    this.LicenseNo = null;
    this.LicenseDegree = null;
    this.OnlineAccountId = null;
    this.OnlineAccountPassword = null;
    this.BranchCode = null;
    this.DriveCode = null;
    this.drivingId = 0;
  }
}
