import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from "@angular/core";
import { TokenService } from '../services/auth-service/TokenService';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isTokenExpired() && tokenService.getToken() !== null) {
    return true;
  }

  router.navigateByUrl("/home");
  return false;
};

/**
 * Este sirve para buscar una URL que coincida con la que se está intentando acceder.
 * @param route
 * @param segments
 */
export const authGuardMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return true;
};
