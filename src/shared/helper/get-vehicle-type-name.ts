import { VehicleTypesEnum } from "../enums/vehicle-types.enum";
export function GetVehicleType(id: number): string {
    let TypeName;
    switch (id) {
        case VehicleTypesEnum.Cold:
            TypeName = VehicleTypesEnum.ColdTypeDisplayName;
            break;
        case VehicleTypesEnum.Dry:
            TypeName = VehicleTypesEnum.DryTypeDisplayName;
            break;
        case VehicleTypesEnum.Flatbed:
            TypeName = VehicleTypesEnum.FlatbedTypeDisplayName;
            break;
    }
    return TypeName;
}
