import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth";
import { inject } from "@angular/core";

export const  authGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    
    let authenticated = await auth.verifyAuthenticated();

    if(!authenticated){
        router.navigate(['/login']);
        return false;
    }

    return true;

}
    
export const guestGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);
        
    let authenticated: boolean = await auth.verifyAuthenticated();

    if(authenticated){
        router.navigate(['/home']);
        return false;
    }

    return true;
}