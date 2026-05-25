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
import { Quiz } from './components/games/quiz/quiz';
import { Viceversa } from './components/games/viceversa/viceversa';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login, canActivate: [guestGuard]},
  {path: 'register', component: Register, canActivate: [guestGuard]},
  {path: 'home', component: Home, canActivate: [authGuard]},
  {path: 'who-i-am', component: WhoIAm, canActivate: [authGuard]},
  {path: 'chat', component: Chat, canActivate: [authGuard]}, 
  {path: 'games', component: Games, 
    children: [
      {path: 'hanged', 
        component: Hanged,
        canActivate: [authGuard]
      },
      
      {path: 'greater-or-lesser', 
        component: GreaterOrLesser,
        canActivate: [authGuard]
      },

      {path: 'quiz', 
        component: Quiz,
        canActivate: [authGuard]
      }, 

      {path: 'viceversa', 
        component: Viceversa,
        canActivate: [authGuard]
      }, 
    ]
  },
  {path: '**', component: Login},

  

];