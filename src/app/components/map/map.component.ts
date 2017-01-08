import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  lat: number = 58.247426;
  lng: number = 11.459008;

}

//Marker Type
interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}

