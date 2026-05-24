import { Component, inject, signal } from '@angular/core';
import { HangedServices } from '../../../services/hanged';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-hanged',
  imports: [RouterLink],
  templateUrl: './hanged.html',
  styleUrl: './hanged.css',
})
export class Hanged {
  private hanged = inject(HangedServices);
  private auth = inject(AuthService);

  lives: number = 6;
  secretWord = 'ANGULAR';
  secretWordArray: string[] = []; // [_ _ _ _ _ _]
  indexArray: number[] = [];
  ArrayLetter: string[] = ['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  arrayWord: string[] = this.secretWord.split(''); 
  usedLetters = new Set<string>();
  
  clock: string = '';

  gameOver = false;
  
  constructor(){
    this.drawSpaces();

    setInterval(() => {
      
      const date: Date = new Date();
      
      this.clock = date.toLocaleTimeString('es-AR',{
        minute: '2-digit',
        second: '2-digit'
      });
  
    }, 1000);
  }

  private drawSpaces(){
    for(let i: number = 0; i < this.secretWord.length; i++){
      this.secretWordArray.push('_');
    }
    
  }


  resetGame(){

    this.lives = 6;

    this.secretWord = 'ANGULAR';

    this.secretWordArray = [];

    this.indexArray = [];

    this.usedLetters.clear();

    this.gameOver = (false);
    
    this.clock = '';

    this.drawSpaces();
}

  sendValue(buttonWord: string){
    
    if(this.usedLetters.has(buttonWord)){
      return;
    }

    this.usedLetters.add(buttonWord);

    if(this.arrayWord.includes(buttonWord)){ // [A N G U L A R] INCLUYE 'A'?

      this.findArrayWord(buttonWord);

      this.checkVictory();
    }
    else{
      this.lives--;
      this.checkVictory();
    
    }
  

  }

  checkLetter(buttonWord: string): boolean {

    if(this.usedLetters.has(buttonWord)){
      return false;
    }

    this.usedLetters.add(buttonWord);
    return true;
  }

  checkVictory(){
    if(!this.secretWordArray.includes('_')){
      console.log('GANASTE');
      this.gameOver = true;
    }
    
    if(this.lives <= 0){
      console.log('PERDISTE');
      this.gameOver = true;
    }
    
    // this.hanged.sendData()
    // enviar datos a database...
    const id = 0;
    const email = '';
    const time = 0; 
    const user = this.auth.currentUser()
    user?.id
    user?.email
    if(user?.email){
      this.hanged.sendData(id, user?.email, this.secretWord,this.gameOver,this.lives,this.usedLetters.size,time);
    }



  }

  findArrayWord(buttonWord: string){
    if(this.arrayWord.includes(buttonWord)){ // [A N G U L A R] INCLUYE 'A'?

      for(let i = 0; i < this.secretWord.length; i++){ //aca estamos buscando si hay mas de una coincidencia
        if(this.arrayWord[i] === buttonWord){
          this.indexArray.push(i) // guardamos 2 valores, porque A aparece 2 veces
        }
      }

      // console.log(this.indexArray); // indexArray = [0, 5]
        
        for(let i=0; i < this.secretWordArray.length; i++){ //recorremos el largo del arraysecreto
          for(let j=0; j < this.indexArray.length; j++){ // recorremos el largo del array de indices
            if (i === this.indexArray[j]){ // preguntamos si la posicion "i" es igual a algun elemento del indexArray. ej: 0 === 0 [0,5] 
            this.secretWordArray[i] = buttonWord; // al array secreto en posicion de i, le metemos la palabra, ej: en secretWord[0] reemplazamos y ponemos la letra 'A'
            }
        }
      }
      this.indexArray = [];
    }

  }

}
