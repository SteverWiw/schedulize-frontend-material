import { inject, Injectable } from '@angular/core';
import { Authrequest } from "./authrequest";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs";
import { TokenService } from "./TokenService";
import { environment } from '../../../environments/environment.development';

const base_url = environment.base_url_login;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(authrequest: Authrequest) {
    const body = {
      userName: authrequest.userName,
      password: authrequest.password
    } as Authrequest;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const path = `${base_url}/login`;

    return this.http.post<any>(path, body, { headers: headers }).pipe(
      tap(response => {
        this.tokenService.setToken(response.objectList[0].token);
      })
    );
  }

  isAuth(): boolean {
    const expirationDate = this.tokenService.getExpirationDate();
    return expirationDate !== null && expirationDate > new Date();
  }

}
