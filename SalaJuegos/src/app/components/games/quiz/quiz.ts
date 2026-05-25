import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz';
import { AuthService } from '../../../services/auth';
import { timeStamp } from 'console';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {

  	private quizService = inject(QuizService);
	private authService = inject(AuthService);

	correctAnswers: number = 0;
  	gameFinished = false;
  	seconds = 0;
	timer: any;
	clock = '0s';	
  
  questions = this.quizService.getQuestions();
  round = signal<number>(0);
  currentQuestion = computed(() =>  this.questions()[this.round()]
);

  ngOnInit(): void {
    this.quizService.loadQuestions();
	this.startTimer();
  }

  startTimer(){
	this.timer = setInterval(() => {
		this.seconds++;

		const minutes = Math.floor(this.seconds / 60);

		const secs = this.seconds % 60;

    	this.clock = `${minutes}m ${secs}s`;

	}, 1000);
  	}

  stopTimer(){
  	clearInterval(this.timer);
	}



  verify(value: string, correct_answer: string){

    if(value == correct_answer){

      this.correctAnswers++;

    }

    if(this.round() < this.questions().length - 1){

      this.round.update(value => value + 1);

    } else {
		this.gameFinished = true;
		this.stopTimer();

    	console.log('Duración:', this.seconds);
		this.sendData();
    }
  } 

  async sendData(){

	const user = this.authService.currentUser();

	if (user?.email){
		return await this.quizService.sendData(user.email,this.correctAnswers, this.seconds);
	}
  }


// ○ Debe obtener los datos de una api.
// ○ Puede ser una api de preguntas o una api con información a la que luego se le agregue la
// funcionalidad de preguntados. Puede estar en inglés.
// ○ Las opciones de elección deben ser botones.
// ○ Al finalizar la partida, guardar en la base de datos: el usuario que jugó, cantidad de
// preguntas acertadas, etc.

}
