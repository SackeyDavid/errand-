import { Component, OnInit } from '@angular/core';

declare var google: any
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  public map
  constructor() { 
   
  }

  ngOnInit() {
    this.map = this.createMap()
  }

  createMap(location = new google.maps.LatLng(5.6037168, -0.1869644)) {
    let mapOptions = {
      center: location,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEL = document.getElementById('map')
    let map = new google.maps.Map(mapEL, mapOptions)

    return map

  }
}
