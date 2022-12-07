import { Base } from '../base.model';

export class VehicleType extends Base {
  Name: string;

  constructor() {
    super();
    this.Name = '';
  }
}
