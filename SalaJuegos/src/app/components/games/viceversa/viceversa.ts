import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViceversaService } from '../../../services/viceversa';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-viceversa',
  imports: [RouterLink],
  templateUrl: './viceversa.html',
  styleUrl: './viceversa.css',
})
export class Viceversa {
  private viceversaService = inject(ViceversaService);
  private authService = inject(AuthService);

  words = [
  'Microservices', 'Authentication',
  'Multiplication',
  'Infrastructure',
  'Bioinformatics',
  'Containerization', 'Decentralization', 'Multithreading',
  'Objectoriented',
  'Dataobjectmodel',  'Functionalprog',
  'Asynchronous',  
  'Normalization', 
  'Responsivedesign', 'Versioncontrol',
  'Continuousint', 
  'Cybersecurity', 
  'Cloudcomputing',
  'Datastructures',
  'Webdevelopment',
  'Dependencyinj', 
  'Machinelearning',  'Cryptocurrency',
  'Backenddeveloper', 'Frontenddeveloper','Fullstackdevelop'    
];

  word = '';
  reverseWordArray: string[] = [];
  reverseWordLetters: string[] = [];
  arrayScript: string[] = [];

  currentIndex: number = 0;
  lastIndex: number = -1;

  currentRound: number = 1;
  maxRounds: number = 5;
  gameFinished: boolean = false;

  // CONTROL DEL RELOJ (TIMER)
  seconds: number = 0;
  timerId: any;

  constructor() {
    this.startGame();
    this.startClock(); 
  }

  startGame() {
    this.currentIndex = 0;
    this.arrayScript = [];
    this.reverseWordLetters = [];
    this.mixArraySecretWords();
    this.drawSpaces();
    this.mixLetters();
  }

  startClock() {
    this.timerId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  stopClock() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  mixArraySecretWords() {
    let index: number;
    do {
      index = Math.floor(Math.random() * this.words.length);
    } while (index === this.lastIndex);

    this.lastIndex = index;
    this.word = this.words[index];
    this.reverseWordArray = this.word.split('').reverse();
    console.log(this.word);
  }

  drawSpaces() {
    for (let i = 0; i < this.word.length; i++) {
      this.arrayScript.push('_');
    }
  }

  mixLetters() {
    const usedIndexes: number[] = [];

    while (this.reverseWordLetters.length < this.reverseWordArray.length) {

      let index = Math.floor(Math.random() * this.reverseWordArray.length);

      if (!usedIndexes.includes(index)) {

        usedIndexes.push(index);
        this.reverseWordLetters.push(this.reverseWordArray[index]);
      }
    }
  }

  verify(value: string) {
    if (this.gameFinished) return;

    const correctLetter = this.word[this.currentIndex];

    if (value.toUpperCase() === correctLetter.toUpperCase()) {
      this.arrayScript[this.currentIndex] = correctLetter;
      this.currentIndex++;

      if (this.currentIndex >= this.word.length) {
        console.log('WORD COMPLETED');
      }
    }
  }

  async nextRound() {
    if (this.currentRound < this.maxRounds) {
      this.currentRound++;
      this.startGame();
    } else {
      this.finishGame();
    }
  }

  async finishGame() {
    this.gameFinished = true;
    this.stopClock(); // Frenamos el setInterval

    await this.sendData();
  }

  async sendData() {

    // Al finalizar la partida, guardar en la base de datos: el usuario que jugó y algún dato que
    // mida su desempeño (puntaje, tiempo en finalizar, etc).
    const user = this.authService.currentUser();
    
    if(user?.email){
      console.log('Enviando datos a la base de datos...');
      await this.viceversaService.sendData(user.email, this.seconds);

    }
  }
}