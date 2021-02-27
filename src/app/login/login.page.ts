import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAWS } from '../services/service.aws';
import { token } from '../models/token.model';
import { Storage } from '@ionic/storage';
import { Usuario } from '../models/usuario.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarioJson : any; 
  public pass = '';
  public username = '';
  public recordar :boolean;
  public usuario:any;
  constructor(private router: Router,private aws: ServiceAWS,private storage: Storage, public alertController: AlertController) { 
    this.storage.get('pass').then((val) => {});
    this.storage.get('username').then((val) => {});
  }

  ngOnInit() {
    this.username = 'devoto';
    this.pass = 'devoto';
  }
  async navTabs(){   

    this.usuario = new Usuario();
    this.usuarioJson = {
      'username': this.username,
      'pass': this.pass
      };
    if(this.username === null || this.username === '' ){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Usarname o Password incorrecto.',
        buttons: ['OK']
      });
  
      await alert.present();
    }else if (this.pass === ''){      
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Usarname o Password incorrecto.',
          buttons: ['OK']
        });    
        await alert.present();
      

    }else{
        if(this.recordar){
          this.storage.set('pass', this.username);
          this.storage.set('', this.username);      
          console.log('recordar');      
        }else{
          this.storage.remove('pass');
          this.storage.remove('username');
          this.username ='';
          this.pass = '';
          console.log('olvidar');    
        }
      this.aws.loginAccount(this.usuarioJson).subscribe(
        (data:token) => {
         
          this.storage.set('token', data.token);
          this.storage.set('auth', data.auth);

          this.storage.get('auth').then((val) => {
            if(val === true){
              console.log('entra');   
               
              this.storage.get('token').then((stoken) => {
                this.aws.obtenerUsuario(stoken).subscribe(
                  (data:any) => {  
                    if(data.auth === true){
                      this.usuario = data.data;   
                      this.storage.set('usuario', this.usuario); 
                      this.router.navigateByUrl("crops/tabs/map");
                    }else{
                      console.log(data.message);
                    }
                  },
                  error => {                   
                    console.log(error);
                  }
                );
              });
            }            
          });        
        },
        error => {
          console.log(error);
        }
      );
    }    
  }

  async recuperarContrasena(){
    this.router.navigateByUrl("recuperar");
  }

  checkEvent(recordar){
    console.log(recordar);
    this.recordar = recordar;

  }
}
