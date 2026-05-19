import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoIAm } from './components/who-i-am/who-i-am';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'who-i-am', component: WhoIAm},
];