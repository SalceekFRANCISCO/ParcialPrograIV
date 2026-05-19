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
        
    if(auth.isAuthenticated()){ //usuario quiere ir a loguin, pero ya esta autenticado
        router.navigate(['/home']); //mandalo a home
        return false; // no permitas que entre a login (false) si ya esta autenticado
    }else{
        return true;
    }
}