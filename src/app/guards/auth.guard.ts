import {CanActivateFn, CanMatchFn, Route, Router, UrlSegment} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth-service/auth.service";
import {state} from "@angular/animations";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth()){
    return true;
  }
  router.navigateByUrl("home");
  return authService.isAuth();
};
/**
 * este sirve para buscar una url que machee con la que se esta intentando acceder
 * @param route
 * @param segments
 */
export const authGuardMatch: CanMatchFn = (route:Route,segments:UrlSegment[]) =>{
  return true;
}
