import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viceversa',
  imports: [RouterLink],
  templateUrl: './viceversa.html',
  styleUrl: './viceversa.css',
})
export class Viceversa {

  words = [
    'Angular',
    'Typescript',
    'React',
    'Postgresql',
    'Github',
    'Javascript',
    'Nodejs',
    'Mongodb',
    'Docker',
    'Html',
    'Css',
    'Tailwind',
    'Supabase',
    'Firebase',
    'Python',
    'Java',
    'Springboot',
    'Express',
    'Mysql',
    'Database',
    'Frontend',
    'Backend',
    'Fullstack',
    'Apirest',
    'Programming',
    'Developer'
  ];

  word = '';

  reverseWordArray: string[] = [];

  reverseWordLetters: string[] = [];

  arrayScript: string[] = [];

  currentIndex: number = 0;

  lastIndex: number = -1;

  // GUARDA LOS BOTONES YA USADOS
  usedIndexes = new Set<number>();

  constructor(){

    this.startGame();
  }

  startGame(){

    this.currentIndex = 0;

    this.arrayScript = [];

    this.reverseWordLetters = [];

    this.mixArraySecretWords();

    this.drawSpaces();

    this.mixLetters();
  }

  mixArraySecretWords(){

    let index: number;

    do {

      index = Math.floor(
        Math.random() * this.words.length
      );

    } while(index === this.lastIndex);

    this.lastIndex = index;

    this.word = this.words[index];

    this.reverseWordArray =
      this.word
        .split('')
        .reverse();

    console.log(this.word);
  }

  drawSpaces(){

    for(let i = 0; i < this.word.length; i++){

      this.arrayScript.push('_');
    }
  }

  mixLetters(){

    const usedIndexes: number[] = [];

    while(
      this.reverseWordLetters.length <
      this.reverseWordArray.length
    ){

      let index = Math.floor(
        Math.random() *
        this.reverseWordArray.length
      );

      if(!usedIndexes.includes(index)){

        usedIndexes.push(index);

        this.reverseWordLetters.push(
          this.reverseWordArray[index]
        );
      }
    }

    console.log(this.reverseWordLetters);
  }

  verify(value: string){

  const correctLetter =
    this.word[this.currentIndex];

  // SI ES CORRECTA

  if(
    value.toUpperCase() ===
    correctLetter.toUpperCase()
  ){

    this.arrayScript[this.currentIndex] =
      correctLetter;

    this.currentIndex++;

    console.log('correct');

    // TERMINÓ PALABRA

    if(this.currentIndex >= this.word.length){

      console.log('WORD COMPLETED');
    }

  } else {

    console.log('incorrect');
  }
}
  nextRound(){

    this.startGame();
  }
}