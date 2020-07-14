import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public user = this._wsService.user;

  constructor(private _wsService: WebsocketService) { }

  ngOnInit(): void {
  }

  logout():void{
    this._wsService.logoutWebSocket();
  }

}
