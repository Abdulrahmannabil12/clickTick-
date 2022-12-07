import { CompanyRegion } from 'src/app/modules/companies/_models/company-region.model';
import { ExtraService } from 'src/app/modules/companies/_models/extra-service.model';
import { TripRate } from 'src/app/modules/companies/_models/trip-rate.model';
import { Region } from 'src/app/modules/region/_model/region.model';
import { ContractTypeEnum } from '../../enums/contract-type.enum';

export class Company {
  id: number;
  nameAr: string;
  nameEn: string;
  email: string;
  contractIssuingDate: Date;
  contractEndDate: Date;
  contractTypeId: ContractTypeEnum;
  representativeName: string;
  representativeJob: string;
  companyAddress: string;
  commercialRegistrationNo: number;
  taxCardNo: number;
  active: boolean;
  contractScanUrl: string;
  tripRates: Array<any>;
  extraServices: Array<any>;
  regions: Array<any>;
  position: number;


  constructor() {
    this.tripRates = [];
    this.extraServices = [];
    this.regions = [];
  }
}
