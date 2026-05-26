import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz';
import { AuthService } from '../../../services/auth';
import { RouterLink } from '@angular/router';
import { dataQuiz } from '../../../models/apiquiz.model';

@Component({
  selector: 'app-quiz',
  imports: [RouterLink],
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
	currentQuestion = computed(() =>  this.questions()[this.round()]);


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

	startAgain(){
		this.correctAnswers = 0;
		this.round.set(0);
		this.gameFinished = false;		
		this.quizService.loadQuestions();
		this.startTimer();
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
		const data: dataQuiz = {
			user_email: user.email,
			correct_answers: this.correctAnswers,
			duration: this.seconds,
			questions: this.questions.length

		}
		return await this.quizService.sendData(data);
	}
	}


}
