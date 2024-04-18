import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY!:string;

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

  const expirationDate = this.getExpirationDate();
    return expirationDate !== null && new Date() > expirationDate ;
  }

  getExpirationDate(): Date | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken = this.decodeToken(token);
    if (!(decodedToken || decodedToken.exp)) {
      return null;
    }

    return new Date(decodedToken.exp * 1000);
  }

  getUserData(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return this.decodeToken(token);
  }

  private decodeToken(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch (e) {
      return null;
    }
  }
}
