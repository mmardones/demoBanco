import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(), 
    AppRoutingModule,HttpClientModule],
  providers: [    
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },GoogleMaps
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
