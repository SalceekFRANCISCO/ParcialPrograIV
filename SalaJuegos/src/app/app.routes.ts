import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoIAm } from './components/who-i-am/who-i-am';
import { guestGuard, authGuard } from './guards/auth';
import { Hanged } from './components/games/hanged/hanged';
import { GreaterOrLesser } from './components/games/greater-or-lesser/greater-or-lesser';
import { Chat } from './components/chat/chat';
import { Games } from './components/games/games';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: Home, canActivate: [authGuard]},
  {path: 'login', component: Login, canActivate: [guestGuard]},
  {path: 'register', component: Register, canActivate: [guestGuard]},
  {path: 'who-i-am', component: WhoIAm, canActivate: [authGuard]},
  {path: 'chat', component: Chat}, 
  {path: 'games', component: Games, 
    children: [
      {path: 'hanged', 
        component: Hanged,
      },
      
      {path: 'greater-or-lesser', 
        component: GreaterOrLesser,
      }, 
    ]
  },
  {path: '**', component: Login},

  

];