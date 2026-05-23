import { Component } from '@angular/core';

@Component({
  selector: 'app-hanged',
  imports: [],
  templateUrl: './hanged.html',
  styleUrl: './hanged.css',
})
export class Hanged {

  lives: number = 6;
  secretWord = 'ANGULAR';
  secretWordArray: string[] = []; // [_ _ _ _ _ _]
  indexArray: number[] = [];
  ArrayLetter: string[] = ['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  arrayWord: string[] = this.secretWord.split(''); 
  usedLetters = new Set<string>();

  constructor(){
    this.drawSpaces();
  }

  drawSpaces(){
    for(let i: number = 0; i < this.secretWord.length; i++){
      this.secretWordArray.push('_');
    }
    
  }


  // showSpaces(): void{
  //   this.secretWordArray.forEach((value, index) => {
  //     console.log(index);
  //     console.log(value);
      
  //   });
  // }


  sendValue(buttonWord: string){
    // console.log(buttonWord);

    if(this.arrayWord.includes(buttonWord)){ // [A N G U L A R] INCLUYE 'A'?
      // console.log('le acertase');
      

      for(let i = 0; i < this.secretWord.length; i++){ //aca estamos buscando si hay mas de una coincidencia
        if(this.arrayWord[i] === buttonWord){
          this.indexArray.push(i) // guardamos 2 valores, porque A aparece 2 veces
        }
      }

      // console.log(this.indexArray); // indexArray = [0, 5]
      
      for(let i=0; i < this.secretWordArray.length; i++){
        for(let j=0; j < this.indexArray.length; j++){
          if (i === this.indexArray[j]){
          this.secretWordArray[i] = buttonWord;
          }
      }
    }
    this.indexArray = [];
    }
    else{
      console.log('no le acertaste');
      this.lives--;
      
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
    }

    if(this.lives <= 0){
      console.log('PERDISTE');
    }


  }


}
