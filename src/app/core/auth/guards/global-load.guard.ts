import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GlobalCanLoadGuard implements CanLoad {

  constructor(
    private authService: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> {
    return (this.authService.isNotCliente());
  }
}
