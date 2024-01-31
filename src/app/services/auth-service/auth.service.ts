import { inject, Injectable } from '@angular/core';
import { Authrequest } from './authrequest';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../interfaces/genericresponse';
import { TokenService } from './TokenService';

const base_url = environment.base_url_login;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); 
  private tokenService = inject(TokenService); 
  login(authrequest: Authrequest): Observable<ApiResponse> {
    const body = {
      userName: authrequest.userName,
      password: authrequest.password,
    } as Authrequest;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const path = `${base_url}/login`;

    return this.http.post<ApiResponse>(path, body, { headers: headers });
  }

  isAuth(): boolean {
    console.log("valida si expiro el token");
    return this.tokenService.isTokenExpired();
  }

}
