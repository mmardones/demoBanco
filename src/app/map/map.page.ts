import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';
import { NavController, Platform } from '@ionic/angular';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ServiceAWS } from '../services/service.aws';
import { Estacion } from '../models/estacion.model';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage{
  map: GoogleMap;
  public estacion : Estacion;
  public ver = true;
  public estaciones : Array<Estacion> = new Array<Estacion>();
  public captura:any;
  constructor(public platform: Platform, public nav: NavController,private aws: ServiceAWS,private storage: Storage) {
    
  
    
  }

  ngAfterViewInit() {

		this.platform.ready().then( () => {
      
    this.storage.get('token').then((stoken) => {
      this.aws.obtenerItem(stoken).subscribe(
        (data:any) => { 
          console.log(data);
          
          if(data.auth === true){
            data.message.forEach(estacion => {
              this.estaciones.push(estacion);
            });
            this.storage.set('estaciones', this.estaciones);
            //console.log(this.estaciones);
            this.loadMap(this.estaciones);
          }        
        },
        error => {                   
          console.log(error);
        }
      );
    });
    this.captura = new Date().toLocaleString();
    this.storage.set('captura',this.captura);
    
			
		});
	}

  ngOnInit() {
    
  }
  loadMap(estaciones:Array<Estacion>) {

    let map = GoogleMaps.create('map',{mapType: GoogleMapsMapTypeId.SATELLITE});
    
    map.one( GoogleMapsEvent.MAP_READY ).then( ( data: any ) => {
      
      let coordinates: LatLng = new LatLng( estaciones[0].location.latitude,
        estaciones[0].location.longitude);
  
      let position = {
        target: coordinates,
        zoom: 17
      };
  
      map.animateCamera( position );

      var iconBase =
            'assets/icon/';

        var icons = {
          soil: {
            icon: iconBase + 'soil_map_2.svg'
          },
          15: {
            icon: iconBase + 'flow.svg'
          },
          18: {
            icon: iconBase + 'flow.svg'
          },
          10: {
            icon: iconBase + 'weather_map_1.svg'
          },
          11: {
            icon: iconBase + 'weather_map_1.svg'
          },
          14: {
            icon: iconBase + 'weather_map_1.svg'
          },
          17: {
            icon: iconBase + 'weather_map_1.svg'
          }
        };

    
      estaciones.forEach((estacion) => {
        console.log(estacion.location);
        //console.log("type: "+ estacion.type);
        let coordinates: LatLng = new LatLng(estacion.location.latitude,
          estacion.location.longitude);
          //icon: icons[estacion.type].icon
          //icon: icons['weather'].icon,
        let markerOptions: MarkerOptions = { 
          position: coordinates,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',          
          title: estacion.name
          
        };
    
        const marker = map.addMarker( markerOptions )
        .then( ( marker: Marker ) => {
          console.log('entra a addEventListener 2');
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
            (data) => {
              console.log('entra a addEventListener');
              if(this.ver==true){
                this.ver = false;
              }else{
                this.ver = true;
              }
            }
          );
          marker.showInfoWindow();
        });

      
      });
      
    })
  
  }


   /*ngAfterViewInit(): void {
    this.platform.ready().then( () => {

			this.loadMap();
		});


   this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
      });
      console.log('accuracy',map);
      const infoWindow = new google.maps.InfoWindow;    
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }*/
}
