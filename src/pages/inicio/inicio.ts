import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult
 } from '@ionic-native/google-maps';
declare var google;
/**
 * Generated class for the InicioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

map: GoogleMap;
mapElement: HTMLElement;
marker: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private platform: Platform, 
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder    
  ) {

    platform.ready().then(() => {
        
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        // get current position
        geolocation.getCurrentPosition(posOptions).then(pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            alert('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            this.mapElement = document.getElementById('map');
          
            let mapOptions: GoogleMapOptions = {
              camera: {
                target: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                },
                zoom: 18,
                tilt: 30
              }
            };
            
            this.map = this.googleMaps.create(this.mapElement, mapOptions);

            this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
              console.log('Map is ready!');
      
              // Now you can use all methods safely.
              this.map.addMarker({
                  title: 'Ubicacion',
                  icon: 'blue',
                  animation: 'DROP',
                  draggable: true,
                  position: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                  }
                })
                .then(marker => {
                  this.marker = marker;
                });
            });

        });

    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  direccion:any;
  address:any;  
  onSelectUbication(){
    let request: GeocoderRequest = {
      position: new LatLng(this.marker.getPosition().lat, this.marker.getPosition().lng),
    };
    this.geocoder.geocode(request)
    .then((results) => {
      this.direccion = results[0];
      this.address = [
        (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
        results[0].locality
      ].join(", ");
      console.log("data_: ", this.address);
      this.marker.setTitle(this.address);
      this.marker.showInfoWindow();
      alert(JSON.stringify(this.direccion));
      alert(this.address);
    });
       
  }

}
