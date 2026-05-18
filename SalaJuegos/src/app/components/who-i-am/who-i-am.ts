import { Component, inject, OnInit, Type } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-who-i-am',
  imports: [],
  templateUrl: './who-i-am.html',
  styleUrl: './who-i-am.css',
})
export class WhoIAm implements OnInit{

  private userService = inject(UserService);

  loading = this.userService.loading;
  error = this.userService.error;
  user = this.userService.getUser();

  ngOnInit(): void {
    this.userService.loadUser();
  }
}
