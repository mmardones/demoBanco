import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceAWS } from '../services/service.aws';
import { Usuario } from '../models/usuario.model';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public usuario: Usuario;
  
  constructor(public httpClient: HttpClient, private aws: ServiceAWS, private storage: Storage,private router: Router) {    

    //this.aws.loginAccount
    this.usuario = new Usuario();
    
    this.storage.get('usuario').then((user) => {
      console.log(user);  
      console.log('user'); 
      
      this.usuario  = user;
      this.usuario.username = 'Matias';
      this.usuario.first_name = 'Matias';
      this.usuario.last_name = 'Mardones';
      this.usuario.email='cmatias.mardones@gmail.com';
      this.usuario.phone = '+56940900567';
      console.log(this.usuario);
    });
    
  }

  ngOnInit() {
  }

  cerrarSession(){
    this.storage.remove('usuario');
    this.storage.remove('token');
    this.router.navigateByUrl('');
    
  }
}
