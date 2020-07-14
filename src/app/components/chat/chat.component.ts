import { ChatService } from './../../services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public texto: string;
  public chatSubscription:Subscription;
  public mensajes: any [] = [];
  public elemento:HTMLElement;

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');

    this.chatSubscription = this.chatService.getMessages().subscribe((mssg) => {
      this.mensajes.push(mssg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy():void{
    this.chatSubscription.unsubscribe();
  }

  send() {

    if(this.texto.trim().length === 0){
       return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
