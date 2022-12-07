import { ObjectHasValue } from "../helper/helper";
import { RangeModel } from "./range.model";

export class ExtraParams extends RangeModel {
  shipmentWeight?: number;
  vehicleTypeId?: number;
  constructor(formValue: any = null) {
    super();
    this.shipmentWeight = 0;
    this.vehicleTypeId = 0;

    if (ObjectHasValue(formValue)) {
      this.from = formValue['pickUpDate'];
      this.to = formValue['dropOffDate'];
      this.shipmentWeight = formValue['shipmentWight'];
      this.vehicleTypeId = formValue['vehicleTypeId'];
    }
  }
}
