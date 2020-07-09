import { ChatService } from './services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private chatService: ChatService) {}

  ngOnInit():void{
    this.chatService.getMessagePrivate().subscribe(
      mssg => {
        console.log('mensaje privado:', mssg);
      }
    );
  }
}
