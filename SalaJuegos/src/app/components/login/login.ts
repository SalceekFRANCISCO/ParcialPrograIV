import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  private auth = inject(AuthService);

  email = '';
  password = '';
  loading = signal(false);
  errorMessage = this.auth.errorMessage;

  async onSubmit(){
    this.loading.set(true);
    const success = await this.auth.login(this.email, this.password);
    
    if(!success){
      this.loading.set(false);
    }

  }

  autoLogin(email: string, password: string){
    this.email = email;
    this.password = password;

    // this.email = 'franciscosalceek@gmail.com';
    // this.password = 'mortal';
    

  }


  finalError = computed(() => {
    const error = this.errorMessage();

    if(!error){
      return '';
    }
    if(this.errorMessage()?.code === 'invalid_credentials'){
      return ('El mail o la contraseña no son correctos');
    }
    else{
      return ('Faltan email o Constraseña');
    }

  })

  clearError(): void{
    this.auth.clearError();
  }



}
