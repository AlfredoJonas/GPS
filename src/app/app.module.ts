import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    InicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
