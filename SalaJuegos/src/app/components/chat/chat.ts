import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  chat = inject(ChatService);

  nuevoMensaje = '';
  usuario = '';
  miNombreUsuario = '';


  async enviarMensaje(){
    const nombre = this.usuario.trim();
    const texto = this.nuevoMensaje.trim();

    if (nombre && texto) {
      
    }



  }


  enviar(){
    console.log('adadad');
    
  }



}
