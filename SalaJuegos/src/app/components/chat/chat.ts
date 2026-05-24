import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  chat = inject(ChatService);

  nuevoMensaje = '';
  miNombreUsuario = '';


  async enviarMensaje(){
    const nombre = this.miNombreUsuario.trim();
    const texto = this.nuevoMensaje.trim();

    if (nombre && texto) {
      // 1. Obtenemos o creamos el usuario y mandamos el mensaje
      await this.chat.sendMessage(texto, nombre);
      this.nuevoMensaje = '';
    }
  }








}