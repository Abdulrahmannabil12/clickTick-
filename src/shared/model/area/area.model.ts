import { AreaLatLng } from './area-lat-lng.model';
declare const google: any;

export interface Area {
  id: number;
  name: string;
  active: boolean;
  areaBoundaries: Array<AreaLatLng>;
  polygon: any;

  // constructor(public _name: string = '', public _areaBoundaries: any[] = [], map: any = null) {
  //   this.name = _name;
  //   this.areaBoundaries = _areaBoundaries;
  //   if (map != null)
  //     this.polygon = this.drawAreaPolygon(map);
  //   this.active = false;
  // }

  // private drawAreaPolygon(map: any): any {
  //   let polygon = new google.maps.Polygon({
  //     paths: this.areaBoundaries,
  //     strokeColor: "#FF0000",
  //     fillColor: "#FF0000",
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillOpacity: 0.35,
  //     clickable: false,
  //   });

  //   polygon.setMap(map);
  //   return polygon;
  // }
}
