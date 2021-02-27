import { Component, OnInit } from '@angular/core';
import { ServiceAWS } from '../services/service.aws';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  public username = '';
  usuarioJson : any; 
  auth:boolean;
  email:boolean;
  error:boolean = false;
  
  constructor(public httpClient: HttpClient, private aws: ServiceAWS, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
  }

  async volverLogin(){
    this.router.navigateByUrl("");
  }

  async enviar(){
    console.log(this.username);
    this.usuarioJson = {
      'username': this.username
      };
    this.aws.recuperarClave(this.usuarioJson).subscribe(
        (data:any) => {
          console.log(data);
          this.auth = data.auth;
          this.email = data.email;
            if(this.auth && this.email){
              this.presentAlert('Información','Email enviado a su casilla.');               
            }
            if(this.auth && !this.email){
              this.presentAlert('Información','No tiene mail registrado, contactarse con instacrops.');              
            }
            if(!this.auth){            
                this.presentAlert('Información','Usuario no existe en la plataforma.');
            }
        },
        error => {
          console.log(error);
          this.presentAlert('Error','Servicio no disponible, contactarse con instacrops.');
          
        }
      );

      
      
      
  }

  async presentAlert(estado,me ) {
    const alert = await this.alertController.create({
    header: estado,
    message: me,    
    buttons: ['OK']
   });
   await alert.present(); 
}
   
}
