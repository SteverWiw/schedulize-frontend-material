import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = '';

  isAuth(): boolean {
    return this.token != null && this.token.length > 0? true:false;
  }

}
