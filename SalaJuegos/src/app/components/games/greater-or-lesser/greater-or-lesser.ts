import { Component, inject, OnInit } from '@angular/core';
import { greaterOrLesserService } from '../../../services/greater-or-lesser';
import { dataGreater } from '../../../models/greater-or-lesser.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

interface Card {
  value: number;
  suit: string;
}

@Component({
  selector: 'app-greater-or-lesser',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './greater-or-lesser.html',
  styleUrl: './greater-or-lesser.css',
})
export class GreaterOrLesser implements OnInit {

  private authService = inject(AuthService);

  user = this.authService.currentUser;

  hits: number = 0;
  gameFinished: boolean = false;
  currentCard!: Card;
  suits: string[] = ['♠', '♥', '♦', '♣'];

  constructor(
    private greaterOrLesserService: greaterOrLesserService
  ) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {

    this.hits = 0;

    this.gameFinished = false;

    this.currentCard = this.generateCard();
  }

  generateCard(): Card {

    const randomNumber = Math.floor(Math.random() * 13) + 1;

    const randomSuit = this.suits[
      Math.floor(Math.random() * this.suits.length)
    ];

    return {
      value: randomNumber,
      suit: randomSuit
    };
  }

  guess(option: 'higher' | 'lower'): void {

    if (this.gameFinished) return;

    const previousCard = this.currentCard;

    const newCard = this.generateCard();

    console.log('Previous card:', previousCard.value);

    console.log('New card:', newCard.value);

    let correctGuess: boolean = false;

    if (option === 'higher') {

      correctGuess = newCard.value > previousCard.value;
    }

    if (option === 'lower') {

      correctGuess = newCard.value < previousCard.value;
    }

    this.currentCard = newCard;

    if (correctGuess) {

      this.hits++;

      console.log('Correct');

    } else {

      console.log('Game Over');

      this.gameFinished = true;

      this.saveGame();
    }
  }

  stand(): void {

    this.gameFinished = true;

    this.saveGame();
  }

  restartGame(): void {

    this.startGame();
  }

  async saveGame(): Promise<void> {

    const userDB = this.authService.currentUser();

    if(userDB){
      const data: dataGreater = {
        user_email: userDB.email,
        streak: this.hits
      };

      await this.greaterOrLesserService.sendData(data);
    }
  }


  showuser(): string | undefined {
    let userName: string | undefined = '';

    if(this.authService.currentUser()){
      const fullName = this.authService.currentUser()?.email;

      if(fullName){
        userName = fullName.split('@')[0];
        return userName;
      }

    }
    return userName;

  }


}