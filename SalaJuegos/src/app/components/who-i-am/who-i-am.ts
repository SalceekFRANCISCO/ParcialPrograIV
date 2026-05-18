import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-who-i-am',
  imports: [DatePipe],
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
