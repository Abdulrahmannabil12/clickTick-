import { ShipmentLoadTypes } from "../enums/shipment-load-types.enum";

export function GetShipmentLoadType(id: number): string {
    let TypeName;
    switch (id) {
        case ShipmentLoadTypes.Pallets:
            TypeName = ShipmentLoadTypes.PalletsTypeName;
            break;
        case ShipmentLoadTypes.Stacking:
            TypeName = ShipmentLoadTypes.StackingTypeName;
            break;
    }
    return TypeName;
}
