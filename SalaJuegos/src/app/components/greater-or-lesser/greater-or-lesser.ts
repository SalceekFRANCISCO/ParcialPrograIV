import { Component } from '@angular/core';

@Component({
  selector: 'app-greater-or-lesser',
  standalone: true, // Si estás usando las versiones nuevas de Angular
  imports: [],
  templateUrl: './greater-or-lesser.html',
  styleUrl: './greater-or-lesser.css',
})
export class GreaterOrLesser{
  // 1. Declaramos las variables (Propiedades) que usa el HTML
  aciertos: number = 0;
  juegoTerminado: boolean = false;

  // Acá podés ir pensando cómo vas a guardar la carta actual, por ahora la dejamos simulada
  cartaActual: number = 7; 

  constructor() {
    // Acá podrías inicializar el juego o mezclar el mazo más adelante
  }

  // 2. Creamos los métodos (Funciones) que disparan los botones
  adivinar(opcion: 'mayor' | 'menor'): void {
    console.log('El usuario arriesgó que la siguiente carta es:', opcion);
    
    // TODO: Acá va la lógica para sacar la próxima carta y comparar si ganó o perdió.
    // Ejemplo rápido para probar:
    // this.aciertos++; 
  }

  plantarse(): void {
    console.log('El usuario se plantó. Guardando en la base de datos...');
    this.juegoTerminado = true;
    
    // TODO: Acá vas a llamar al servicio para mandar los datos al backend
  }

  reiniciarJuego(): void {
    console.log('Reiniciando la partida...');
    this.aciertos = 0;
    this.juegoTerminado = false;
    
    // TODO: Volver a mezclar el mazo y sacar la primera carta
  }
}