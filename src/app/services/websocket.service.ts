import { User } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  public socketStatus = false;
  public user: User = null;

  constructor(
    private socket: Socket,
    private router: Router) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo evento');
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string): Observable<any> {
    return this.socket.fromEvent(evento);
  }

  loginWebSocket(nombre: string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (res) => {

        this.user = new User(nombre);
        this.saveStorage();
        resolve(true);
      });
    });
  }

  logoutWebSocket(){
      this.user == null;
      localStorage.removeItem('user');

      const payload ={
         nombre: 'sin-nombre'
      }

      this.emit('configurar-usuario', payload, ()=>{});

      this.router.navigateByUrl('');
  }

  getUser(){
    return this.user;
  }

  saveStorage():void{
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage():void{

    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWebSocket(this.user.name);
    }

  }
}
