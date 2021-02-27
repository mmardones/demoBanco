import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceAWS {

  constructor(private http: HttpClient) { }

  loginAccount(body){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    //const requestOptions = new requestOptions({ headers: headers });

    return this.http.post('https://7w2z596o22.execute-api.sa-east-1.amazonaws.com/dev/token/obtenerToken',body);
  }


  obtenerUsuario(token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'x-access-token':token
      })
    }; 
    return this.http.get('https://7w2z596o22.execute-api.sa-east-1.amazonaws.com/dev/user/info',httpOptions);
  }

  obtenerItem(token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'x-access-token':token
      })
    }; 
    return this.http.get('https://7w2z596o22.execute-api.sa-east-1.amazonaws.com/dev/items',httpOptions);
  }
  recuperarClave(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json'
      })
    }; 
    return this.http.post('https://7w2z596o22.execute-api.sa-east-1.amazonaws.com/dev/user/password',body);
  }

}
