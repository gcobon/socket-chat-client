import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje: string){

    const payload = {
      de: this.wsService.getUser().name,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessages(){
    return this.wsService.listen('nuevo-mensaje');
  }

  getUserConfig(){
    return this.wsService.listen('configurar-usuario');
  }

  getMessagePrivate(){
    return this.wsService.listen('mensaje-privado');
  }
}
