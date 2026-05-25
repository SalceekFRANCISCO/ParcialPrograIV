import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule, NgForm } from "@angular/forms"; // Importamos NgForm

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private auth = inject(AuthService);

  name: string = '';
  lastName: string = '';
  age: string = '';
  email: string = '';
  password: string = '';


  // Pasamos el formulario como parámetro para una doble validación segura
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return; // Si el frontend detecta un error, frena acá y no llama al servicio
    }

    this.auth.registerUser(this.name, this.lastName, this.age, this.email, this.password);
  }

  showError = computed(() => {
    const error = this.auth.errorMessage();

    if (!error) return '';

    if (error.code === 'user_already_exists') {
      return 'El usuario ya se encuentra registrado';
    }

    if (error.code === 'weak_password') {
      return 'La Contraseña debe tener un minimo de 6 caracteres';
    }

    if (error.code === 'anonymous_provider_disabled' || error.code === 'validation_failed') {
      return 'Todos los campos son obligatorios';
    }

    return '';
  });
  
}