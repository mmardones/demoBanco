import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { Estacion } from '../models/estacion.model';
import { Snapshot } from '../models/snapshot.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  public estaciones : Array<Estacion> = new Array<Estacion>();
  public captura = '2019-08-11 18:42:08'
  constructor(private storage: Storage,public platform: Platform) {
    this.storage.get('estaciones').then((estaciones) => {
      estaciones.forEach(state => {        
        if(state.asset == 14 || state.asset == 10 || state.asset == 11 || state.asset == 17){
          this.estaciones.push(state);
        }
      });      
      console.log('estaciones');    
      console.log(this.estaciones);      
    });

    this.storage.get('captura').then((captura) => {
           
      console.log('captura'); 
      this.captura = captura;   
      console.log(this.captura);      
    });


   }

  ngOnInit() {
   
  }
  mostrarItem(estacion:Estacion){
    return false;
  }

}
