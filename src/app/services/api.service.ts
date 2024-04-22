import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TokenService } from './Token.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService<T, U> { // Agrega los tipos T y U aquí
  private TokenService = inject(TokenService);
  private baseUrl = environment.base_url; 
  
  constructor(private http: HttpClient) {}  
  
  // Realiza una petición GET
  public get(endpoint: string): Observable<U> {    
    const options = this.getHeaders();
    return this.http.get<U>(`${this.baseUrl}${endpoint}`,{ headers: options });
  }

  // Realiza una petición POST
  public post(endpoint: string, data: T): Observable<U> {
    const options = this.getHeaders();
    return this.http.post<U>(`${this.baseUrl}${endpoint}`, data,{ headers: options });
  }

  // Realiza una petición PUT
  public put(endpoint: string, data: T): Observable<U> {
    const options = this.getHeaders();
    return this.http.put<U>(`${this.baseUrl}${endpoint}`, data,{ headers: options });
  }

  // Realiza una petición DELETE
  public delete(endpoint: string): Observable<void> {
    const options = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrl}${endpoint}`,{ headers: options });
  }

  //para generar los headers necesarios en la peticion 
  private getHeaders(){
   const authToken = this.TokenService.getToken();

   return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    });
  }
}
