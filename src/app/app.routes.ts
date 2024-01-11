import { Routes, CanActivateFn } from '@angular/router';
import {DashboardComponent} from "./routes/dashboard/component/dashboard.component";
import {HomeComponent} from "./routes/home/home.component";
import {NotFoundComponent} from "./routes/not-found/not-found.component";
import {AuthComponent} from "./auth/auth.component";
import {CategoryComponent} from "./routes/modules/inventory/category/category.component";
import {LandingPageComponent} from "./routes/home/landing-page/landing-page.component";

import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path: 'home',component: HomeComponent,
    children:[
      {path:'login',component: AuthComponent},
      {path:'',component: LandingPageComponent
      }
    ]},
  {path: 'dashboard',component: DashboardComponent,canActivate: [authGuard],
    children:[
      {path:'category',component: CategoryComponent}
    ]},
  { path: '**', component:NotFoundComponent },
];
