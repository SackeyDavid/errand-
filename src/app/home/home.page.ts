import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, Marker, GoogleMapsEvent, MyLocation } from '@ionic-native/google-maps'

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
    this.mapElement = this.mapElement.nativeElement;
    this.loadMap()
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

    this.map = GoogleMaps.create(this.mapElement)
  }
  
}
