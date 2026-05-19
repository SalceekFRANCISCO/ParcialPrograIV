import { Component, computed, inject } from '@angular/core';
// import { AuthService } from '../../services/auth';
import { FormsModule } from "@angular/forms";
// import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
