import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  activeUsers$: Observable<any>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.activeUsers$ = this.chatService.getActiveUsers();

    this.chatService.emitActiveUsers();
  }

}
