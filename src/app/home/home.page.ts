import { Component, OnInit, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, Marker, GoogleMapsEvent, MyLocation, GoogleMapsAnimation } from '@ionic-native/google-maps'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

  @ViewChild('map', {static: false}) mapElement: any;
  private loading: any
  private map: GoogleMap
  

  constructor(
    private platform: Platform, 
    private loadingCtrl: LoadingController) { }

  ngOnInit(): void {
     
  }

  ngAfterContentInit() : void {
    setTimeout(() => {

      this.mapElement = this.mapElement.nativeElement;

      this.mapElement.style.width = this.platform.width() + 'px'
      this.mapElement.style.height = this.platform.height() + 'px'
    this.loadMap()
    }, 1000);
    
  }

  async loadMap(){
    this.loading = await this.loadingCtrl.create({
      message: 'Map loading...'

    })
    await this.loading.present()

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': environment.googleMapsKey,
      'API_KEY_FOR_BROWSER_DEBUG': environment.googleMapsKey
    })

    const mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    }
    this.map = GoogleMaps.create(this.mapElement, mapOptions)

    try {
      await this.map.one(GoogleMapsEvent.MAP_READY)
      this.addOriginMarker()
    } catch(error) {
      console.log(error)
    } 

  }

  async addOriginMarker() {
    
    try {
      const myLocation: MyLocation = await this.map.getMyLocation()
      console.log(myLocation)

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      this.map.addMarkerSync({
        title: 'Origin',
        icon: 'blue',
        animation: 'DROP',
        position: myLocation.latLng
      });

    } catch (error) {
      console.log(error)
    } finally {
      this.loading.dismiss()
    }
  }
  
}
