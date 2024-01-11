import {inject, Injectable} from '@angular/core';
import {Authrequest} from "./authrequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {TokenService} from "./TokenService";

const base_url = "http://localhost:8090/app-jwt-auth/v1/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  login(authrequest: Authrequest){
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
