import { Component, inject } from '@angular/core';
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

  secretWordArray: string[] = [];

  indexArray: number[] = [];

  ArrayLetter: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  arrayWord: string[] = this.secretWord.split('');

  usedLetters = new Set<string>();

  gameOver = false;

  clock: string = '0s';

  seconds: number = 0;

  interval: any;

  constructor(){

    this.drawSpaces();

    this.startTimer();
  }

  startTimer(){

    this.interval = setInterval(() => {

      if(!this.gameOver){

        this.seconds++;

        this.clock = `${this.seconds}s`;
      }

    }, 1000);
  }

  private drawSpaces(){
    for(let i = 0; i < this.secretWord.length; i++){
      this.secretWordArray.push('_');
    }
  }

  resetGame(){

    clearInterval(this.interval);

    this.lives = 6;

    this.secretWord = 'ANGULAR';

    this.secretWordArray = [];

    this.indexArray = [];

    this.arrayWord = this.secretWord.split('');

    this.usedLetters.clear();

    this.gameOver = false;

    this.seconds = 0;

    this.clock = '0s';

    this.drawSpaces();

    this.startTimer();
  }

  sendValue(buttonWord: string){

    if(this.gameOver){
      return;
    }

    if(this.usedLetters.has(buttonWord)){
      return;
    }

    this.usedLetters.add(buttonWord);
    if(this.arrayWord.includes(buttonWord)){

      this.findArrayWord(buttonWord);
      this.checkVictory();

    } else {

      this.lives--;
      this.checkVictory();
    }
  }

  checkLetter(buttonWord: string): boolean {

    return !this.usedLetters.has(buttonWord);
  }

  checkVictory(){

    if(!this.secretWordArray.includes('_')){

      console.log('GANASTE');
      this.gameOver = true;
      clearInterval(this.interval);
      this.saveGame(true);
    }

    if(this.lives <= 0){

      console.log('PERDISTE');
      this.gameOver = true;
      clearInterval(this.interval);
      this.saveGame(false);
    }
  }

  async saveGame(victory: boolean){

    const user = this.auth.currentUser();

    if(!user?.email){
      return;
    }else{
      await this.hanged.sendData(user.email, this.secretWord, victory, this.lives,this.usedLetters.size,this.seconds);
    }
  }

  findArrayWord(buttonWord: string){

    if(this.arrayWord.includes(buttonWord)){

      for(let i = 0; i < this.secretWord.length; i++){

        if(this.arrayWord[i] === buttonWord){

          this.indexArray.push(i);
        }
      }

      for(let i = 0; i < this.secretWordArray.length; i++){

        for(let j = 0; j < this.indexArray.length; j++){

          if(i === this.indexArray[j]){

            this.secretWordArray[i] = buttonWord;
          }
        }
      }

      this.indexArray = [];
    }
  }
}