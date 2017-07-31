import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
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

map: any;
image: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
            private platform: Platform, private geolocation: Geolocation) {

    platform.ready().then(() => {

        // get current position
        geolocation.getCurrentPosition().then(pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

            // make sure to create following structure in your view.html file
            // and add a height (for example 100%) to it, else the map won't be visible
            // <ion-content>
            //  <div #map id="map" style="height:100%;"></div>
            // </ion-content>

            // create a new map by passing HTMLElement
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            this.image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                let beachMarker = new google.maps.Marker({
                position: {lat: pos.coords.latitude, lng: pos.coords.longitude},
                map: this.map,
                icon: this.image,
                draggable: true
            });

        });

    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
