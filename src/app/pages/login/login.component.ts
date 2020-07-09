import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nombre: string = '';

  constructor(
    private wsService: WebsocketService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login():void{
    this.wsService.loginWebSocket(this.nombre)
        .then(()=>{
          this.router.navigate(['messages']);
        });
  }

}
