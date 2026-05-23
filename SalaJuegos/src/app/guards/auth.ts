import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
   const auth = inject(AuthService);
    const router = inject(Router);
    
    if(!auth.isAuthenticated()){
        router.navigate(['/login']);
        return false;
    }else{
        return true;
    }
}
    
export const guestGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
        
    if(auth.isAuthenticated()){ //usuario quiere ir a login, pero ya esta autenticado
        // auth.logout();
        router.navigate(['/home']); //mandalo a home
        // console.log('estoy autenticado');
        return false; // no permitas que entre a login (false) si ya esta autenticado
    }else{
        // console.log('no estoy autenticado');
        return true; //permite que vayas a login
    }
}