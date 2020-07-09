import { WebsocketService } from './../services/websocket.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(
    private wsService: WebsocketService,
    private router:Router
    ) {}

  canActivate() {

    if (this.wsService.getUser()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
