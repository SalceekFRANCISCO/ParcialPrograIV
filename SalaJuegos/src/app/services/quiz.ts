import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';


// "type": "multiple",
  //   "difficulty": "easy",
  //   "category": "Entertainment: Film",
  //   "question": "In &quot;ALF&quot;, what was ALF&#039;s real name?",
  //   "correct_answer": "Gordon Shumway",
  //   "incorrect_answers": [
  //     "Gordon Milipp",
  //     "Gordon Foster",
  //     "Go


interface ApiQuiz {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
    category: string,
    difficulty: string

  }

@Injectable({
  providedIn: 'root',
})

export class QuizService {
  private apiQuiz: string = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple';
  private http: HttpClient = inject(HttpClient);
  private supabase = inject(SupabaseService);

  public questions = signal<ApiQuiz[]>([]);

  loadQuestions(){
    this.http.get<any>(this.apiQuiz).subscribe({
      next: (data) => {
        const finalQuestion = data.results.map((quez: any) => ({
          question: quez.question,
          correct_answer: quez.correct_answer,
          incorrect_answers: quez.incorrect_answers,
          category: quez.category,
          difficulty: quez.difficulty,
        })
      )
      this.questions.set(finalQuestion);
      }
    })
  }

  getQuestions(){
    return this.questions.asReadonly();
  }


  async sendData(user_email: string, correct_answers: number, duration: number){

    return await this.supabase
    .getClient()
    .from('quiz')
    .insert({
        user_email: user_email,
        questions: this.questions().length,
        correct_answers: correct_answers,
        duration: duration,
    }).then(({ error }) => {

        if(error){
          console.log('error: ' + error.message);
        }
  });

}







//   startGame() {
//     this.loadQuestions();
//     this.gameState.set('playing');
//     this.round.set(1);
//     console.log(this.questions()[this.round()]);
//     }
    
//   playRound(answer: string) {
//     let isCorrect = this.checkAnswer(this.questions()[this.round()-1], answer);

//     if (isCorrect) {
//         this.addPoint();
//       }

//       this.round.update(round => round + 1);

//       if (this.checkEnd()) {
//         this.endGame();
//       }
//   }

}
