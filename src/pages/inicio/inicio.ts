import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';

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
var map;
var marker;
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

  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private platform: Platform, 
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder,
    private toastController: ToastController    
  ) {
    platform.ready().then(() => {
        
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        // get current position
        geolocation.getCurrentPosition(posOptions).then(pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            alert('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
          
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
              zoom: 18,
              tilt: 30
            });

            marker = new google.maps.Marker({
              map: map,
              title: 'Ubicacion',
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: {lat: pos.coords.latitude, lng: pos.coords.longitude}
            });
            map.addListener('click', function(event) {
              console.log(marker);
              let myLatlng = new google.maps.LatLng(event.latLng.lat(),event.latLng.lng());
              marker.setPosition(myLatlng);
            });

            marker.addListener('click', function(){
              alert();
            });

            /*let mapOptions: GoogleMapOptions = {
              camera: {
                target: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                },
                zoom: 18,
                tilt: 30
              }
            };
            alert('crear mapa');
            this.map = this.googleMaps.create(this.mapElement, mapOptions);

            this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
              console.log('Map is ready!');
              alert('Map is ready!');
            
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
                  alert('Marker add!');
                  this.marker = marker;
                  marker.on(GoogleMapsEvent.MARKER_DRAG)
                  .subscribe(() => {
                    const toast = this.toastController.create({
                        message: 'DRAGGGG',
                        duration: 1000,
                        position: 'bottom'
                      });
                    
                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });
                    
                      toast.present();

                  });
                });
            }); */

        });

    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  /* direccion:any;
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
       
  } */

}
