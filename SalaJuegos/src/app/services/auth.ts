import { inject, Injectable, signal, computed, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { SessionUser } from "../models/user.model";
import { SupabaseService } from "./supabase";
import { AuthError } from "@supabase/supabase-js";

@Injectable({
    providedIn: "root",
})

export class AuthService {
    private router: Router = inject(Router);
    private supabase: SupabaseService = inject(SupabaseService);

    user = signal<SessionUser | null>(null);
    isAuthenticated = computed(() => this.user() != null);
    userEmail = computed(()=> this.user()?.email ?? 'invitado');
    
    currentUser = signal<SessionUser | null>(null);
    errorMessage = signal<AuthError | null>(null);
    
    constructor(){
      this.checkSession();
    }

    async checkSession(){
      const {data: {session}} = await this.supabase.getClient().auth.getSession();
      if (session?.user){
          this.user.set({
              id: session.user.id,
              email: session.user.email ?? ''
          })
      }//implementar algo mas... que devuelva algo
    }

    async login(email: string, password: string): Promise<boolean> {
      const {data, error} = await this.supabase.getClient().auth.signInWithPassword({email, password});
      
      if(error){ 
        this.errorMessage.set(error);
        return false;
      }
      else{
          if(data.user){
            this.user.set({id: data.user.id, email: data.user.email ?? ''});
            this.router.navigate(['/home']);
            this.currentUser.set(this.user());
            return true;
          }
          else{
            return false;
          }
      }
  }

    async logout(){
      console.log('usuario:'+ this.user);
      console.log('usuario actual:'+ this.currentUser);
      console.log('mensaje'+ this.errorMessage);
      
      await this.supabase.getClient().auth.signOut();
      this.user.set(null);
      this.currentUser.set(null);
      this.errorMessage.set(null);
      
      console.log('usuario:'+ this.user);
      console.log('usuario actual:'+ this.currentUser);
      console.log('mensaje'+ this.errorMessage);
      this.router.navigate(['/login']);
    }


    async registerUser(name: string, lastName: string, age: string, email: string, password: string){
      const {data, error} = await this.supabase.getClient().auth.signUp({
      email: email,
      password: password
     });

      if(error) {
        console.log("Error: "+error.message); 
        console.log("Error code: "+error.code); 
        this.errorMessage.set(error)
      }
      // User already registered
    
      else{
        if(data.user){
          await this.supabase.saveUserData(data.user?.id, name, lastName, age, email);
          this.login(email, password);
        }
      }
    }

    clearError(): void{
      this.errorMessage.set(null);
  } 


}