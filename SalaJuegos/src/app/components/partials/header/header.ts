import { Component, computed, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header{
  private auth = inject(AuthService);

  currentUser = this.auth.currentUser;
  
  showuser(): string | undefined {
    let userName: string | undefined = '';

    if(this.auth.currentUser()){
      const fullName = this.auth.currentUser()?.email;

      if(fullName){
        userName = fullName.split('@')[0];
        return userName;
      }

    }
    return userName;

  }

  async logOut() {
    await this.auth.logout()
  }

  showLogOutButton(): boolean {
    if(this.auth.isAuthenticated()){
      return true;
      
    }else{
      return false;
    }

  }

  authenticateUser(): boolean{
    return this.auth.isAuthenticated();
  }

  clearError(): void{
    this.auth.clearError();
  } 

}
