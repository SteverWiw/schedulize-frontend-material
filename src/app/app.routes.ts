import { Routes, CanActivateFn } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {AuthComponent} from "../app/components/auth/auth.component";
import {CategoryComponent} from "../app/components/modules/category/category.component";


import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',component: AuthComponent},    
  {path: 'dashboard',component: DashboardComponent,canActivate: [authGuard],canActivateChild: [authGuard],
    children:[
      {path:'category',component: CategoryComponent}
    ]},
  { path: '**', component:NotFoundComponent },
];

