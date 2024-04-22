import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {AuthComponent} from "../app/components/auth/auth.component";


import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';
import { MenuconfigComponent } from './components/modules/admin/menuconfig/menuconfig.component';
import { UsersconfigComponent } from './components/modules/admin/usersconfig/usersconfig.component';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',component: AuthComponent},    
  {path: 'dashboard',component: DashboardComponent,canActivate: [authGuard],canActivateChild: [authGuard],
    children:[
      {path:'menuconfig',component: MenuconfigComponent},
      {path:'usersconfig',component: UsersconfigComponent}
    ]},
  { path: '**', component:NotFoundComponent },
];

