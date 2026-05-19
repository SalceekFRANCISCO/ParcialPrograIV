import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoIAm } from './components/who-i-am/who-i-am';
import { guestGuard, authGuard } from './guards/auth';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: Home, canActivate: [authGuard]},
  {path: 'login', component: Login, canActivate: [guestGuard]},
  {path: 'register', component: Register, canActivate: [guestGuard]},
  {path: 'who-i-am', component: WhoIAm, canActivate: [authGuard]}

];