import { EventEmitter, Injectable } from '@angular/core';
import { ExtrasTypeEnum } from 'src/shared/enums/Extras.enum';



@Injectable({
    providedIn: 'root',
})
export class TotalAmountService {
    totalAmount: EventEmitter<any> = new EventEmitter();
    hasReturnRequestVal: EventEmitter<any> = new EventEmitter();
    hasOvernightVal: EventEmitter<any> = new EventEmitter();
    hasExtraDayVal: EventEmitter<any> = new EventEmitter();
    hasExtraStopsVal: EventEmitter<any> = new EventEmitter();
    hasRepresentativeVal: EventEmitter<any> = new EventEmitter();
    private ReturnRequestVal = 0;

    getTotalAmount(item, form, shipmentWight) {
        const selectedRegionIds = new Array();
        let amount = 0;
        const vehicleId = this.getVechileTypeId(shipmentWight);

        form.pickUpRegionId >= 0 ? selectedRegionIds.push(form.pickUpRegionId) : null;

        form.dropOffRegionId >= 0 ? selectedRegionIds.push(form.dropOffRegionId) : null;
        if (selectedRegionIds[0] == selectedRegionIds[1]) {
            this.removefromArray(selectedRegionIds, selectedRegionIds[1]);
        }
        const extrasPrice = this.getExtraServicesPrice(item.extraServices, form, vehicleId);

        const tripPrice = this.getTripRatesRegionPrice(item.tripRates, selectedRegionIds, vehicleId);
        const regionsHasExtraStop = selectedRegionIds.includes(form.extraStopRegionId);
        amount = tripPrice + extrasPrice;
        if (form.hasExtraStops) {
            const extraStopPrice = this.getExtraStopPrice(item.tripRates, vehicleId, tripPrice,
                form.extraStopRegionId, regionsHasExtraStop);
            amount += extraStopPrice;
        }
        this.totalAmount.emit(amount);
    }
    getExtraStopPrice(tripRateList, vehicleId, totalTripRatePrice, regionId, regionsHasExtraStop) {
        let total = 0;
        if (regionsHasExtraStop) {
            total = totalTripRatePrice * .5;
            this.hasExtraStopsVal.emit(total);
            return total;
        } else {
            total = this.getTripRatesRegionPrice(tripRateList, [regionId], vehicleId);
            this.hasExtraStopsVal.emit(total);
            return total;
        }
    }
    getTripRatesRegionPrice(tripRateList, RegionIds, vehicleId) {
        let total = 0;
        let priceListArray = [];
        RegionIds.forEach((RegionId, key) => {

            tripRateList.map((res) => {

                if (RegionId !== [] && res.regionId === RegionId) {
                    priceListArray.push(this.getTripRatesvehicleRatesPrice(res.vehicleRates, vehicleId));
                }

            });
        }
        );
        if (priceListArray.length > 0) {
            total += Math.max(...priceListArray.values());
            if (this.ReturnRequestVal < 1 && this.ReturnRequestVal > 0) {
                total += total * this.ReturnRequestVal;

            } else if (this.ReturnRequestVal > 1) {
                total += this.ReturnRequestVal;

            }
        }

        return total;

    }
    getTripRatesvehicleRatesPrice(vehicleRates, vehicleId) {
        let total = 0;
        vehicleRates.map((data) => {
            if (data.vehicleBrandId == vehicleId) {
                total += data.rate;
            }
        });
        return total;
    }

    getExtraServicesPrice(ExtraServices, form, vehicleId) {
        let total = 0;
        var extraIds = new Array();
        form.hasExtraStops ? extraIds.push(ExtrasTypeEnum.ExtraStop) : this.removefromArray(extraIds, ExtrasTypeEnum.ExtraStop); this.hasExtraStopsVal.emit(0);
        form.hasExtraDay ? extraIds.push(ExtrasTypeEnum.ExtraDay) : this.removefromArray(extraIds, ExtrasTypeEnum.ExtraDay); this.hasExtraDayVal.emit(0);
        form.hasOvernight ? extraIds.push(ExtrasTypeEnum.ExtraOvernightFees) : this.removefromArray(extraIds, ExtrasTypeEnum.ExtraOvernightFees); this.hasOvernightVal.emit(0);
        form.hasReturnRequest ? extraIds.push(ExtrasTypeEnum.ExtraReturn) : this.removefromArray(extraIds, ExtrasTypeEnum.ExtraReturn); this.hasExtraStopsVal.emit(0); this.ReturnRequestVal = 0;
        form.hasRepresentative ? extraIds.push(ExtrasTypeEnum.ExtraRepresentative) : this.removefromArray(extraIds, ExtrasTypeEnum.ExtraRepresentative); this.hasRepresentativeVal.emit(0);
        extraIds.forEach((extraId, key) => {
            ExtraServices.map((res) => {
                if (extraId == res.id) {
                    total += this.getExtrasvehicleRatesPrice(res.vehicleRates, vehicleId, extraId)
                }
            });
        });

        return total;

    }
    getExtrasvehicleRatesPrice(vehicleRates, vehicleId, extraId) {
        let total = 0;

        vehicleRates.map((data) => {

            if (data.vehicleBrandId == vehicleId) {
                switch (extraId) {
                    // case ExtrasTypeEnum.ExtraStop:

                    //     this.hasExtraStopsVal.emit(data.rate);
                    //     total += data.rate
                    //     break;
                    case ExtrasTypeEnum.ExtraDay:
                        this.hasExtraDayVal.emit(data.rate);

                        total += data.rate;
                        break;
                    case ExtrasTypeEnum.ExtraOvernightFees:
                        this.hasOvernightVal.emit(data.rate);

                        total += data.rate;
                        break;
                    case ExtrasTypeEnum.ExtraReturn:
                        this.ReturnRequestVal = data.rate;
                        this.hasReturnRequestVal.emit(data.rate);

                        break;
                    case ExtrasTypeEnum.ExtraRepresentative:
                        this.hasRepresentativeVal.emit(data.rate);

                        total += data.rate;

                        break;
                    default:
                        break;
                }
            }

        });
        return total;
    }

    removefromArray(array, value) {
        const index = array.findIndex(res => res === value);
        if (index != -1) {
            array.splice(index, 1);
        }
    }

    getVechileTypeId(value) {

        if (value <= 1500 && value >= 100) {
            return 4;

        } else if (value >= 1501 && value <= 3000) {
            return 2;


        } else if (value >= 3001 && value <= 5000) {
            return 3;


        } else if (value >= 5001 && value <= 10000) {
            return 1;

        } else if (value >= 10001 && value <= 20000) {
            return 5;

        } else if (value >= 20000 && value <= 30000) {
            return 6;
        } else if (value > 30000) {
            return 6;
        } else {

            return null;
        }
    }

}
