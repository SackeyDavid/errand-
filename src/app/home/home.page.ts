import { Component, OnInit, ViewChild, AfterContentInit, ElementRef, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, Marker, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Geocoder, ILatLng } from '@ionic-native/google-maps'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
 
declare var google: any

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

  @ViewChild('map', {static: false}) mapElement: any;
  private loading: any
  // private map: GoogleMap
  public search: string = ''
  private googleAutocomplete = new google.maps.places.AutocompleteService()
  public searchResults = new Array<any>()
  public typing = false
  private originMarker: Marker
  public destination: any
  private googleDirectionsService = new google.maps.DirectionsService()
  map: any;
  address:string;

  plans = {
    nothing: '',
    shared: 'shared',
    dedicated: 'dedicated'
  }

  
  activePlan: string =  this.plans.nothing

  constructor(
    private platform: Platform, 
    private loadingCtrl: LoadingController,
    private ngZone: NgZone,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidFullScreen: AndroidFullScreen) { 
      console.log(google)
    }

  ngOnInit(): void {
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => console.log('Immersive mode supported'))
    .catch(err => console.log(err));
  }

  ngAfterContentInit() : void {
    setTimeout(() => {

      this.mapElement = this.mapElement.nativeElement;

      this.mapElement.style.width = this.platform.width() + 'px'
      this.mapElement.style.height = "100%"
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

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
 
    //   this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      // this.map.addListener('tilesloaded', () => {
      //   console.log('accuracy',this.map);
      //   this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      // });
 
    // }).catch((error) => {
    //    console.log('Error getting location', error);
    // });

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

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    try {
      const myLocation: MyLocation = await this.map.getMyLocation()
      console.log(myLocation)

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 20
      });

      this.originMarker = this.map.addMarkerSync({
        title: 'Origin',
        icon: 'black',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng
      });

    } catch (error) {
      console.log(error)
    } finally {
      this.loading.dismiss()
    }
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      });
 
  }

  searchChanged() {
    //this.typing = true
    
    if(!this.search.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({
      input: this.search
    }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions
      })
      
    })
  }

  async calcRoute(item: any) {
    
    
    this.search = ''
    this.destination = item
    
    const info: any = await Geocoder.geocode({address: this.destination.description})
    
    let markerDestination: Marker = this.map.addMarkerSync({
      title: this.destination.description,
      icon: 'black',
      animation: GoogleMapsAnimation.DROP,
      position: info[0].position
    })

    this.googleDirectionsService.route({
      origin: this.originMarker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: 'DRIVING'
    }, async results => {
      const points = new Array<ILatLng>()

      const routes = results.routes[0].overview_path

      for (let i=0; i < routes.length; i++) {
        points[i] = {
          lat:  routes[i].lat(),
          lng: routes[i].lng()
        }
      }

      await this.map.addPolyline({
        points: points,
        color: 'black',
        width: 3
      });

      await this.map.moveCamera({
        target: points
      });

      this.map.panBy(0, 150)

    })

    
  }

  reformat1(str: string) {
    if (str) {
      return str.split(',')[0];
    }
  return [];
  }

  reformat2(str: string) {
    if (str) {
      return str.split(',')[1];
    }
  return [];
  }

  reformat3(str: string) {
    if (str) {
      return str.split(',')[2];
    }
  return [];
  }

  setSelected(plan: string) {
    this.activePlan = this.plans[plan]

  }

  showMap() {
    //show box msg
    this.typing = false;
    console.log(this.typing)
    setTimeout(() => {

      this.mapElement = this.mapElement.nativeElement;

      this.mapElement.style.width = this.platform.width() + 'px'
      this.mapElement.style.height = this.platform.height() + 'px'
    this.loadMap()
    }, 1000);
    //wait 3 Seconds and hide
    // setTimeout(function() {
    //     this.typing = false;
    //     console.log(this.typing);
    // }.bind(this), 3000);
   }

   hideMap() {
    //show box msg
    this.typing = true;
    console.log(this.typing)

    
   }

   async back() {
    try {
      await this.map.clear();
      this.destination = null
      this.addOriginMarker()
    } catch (error) {
      
    }
   }
  
}
