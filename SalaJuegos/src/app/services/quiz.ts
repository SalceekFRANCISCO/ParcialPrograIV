import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { ApiQuiz, dataQuiz } from '../models/apiquiz.model';

@Injectable({
  providedIn: 'root',
})

export class QuizService {

  private apiQuiz: string =
  'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple';

  private http: HttpClient = inject(HttpClient);
  private supabase = inject(SupabaseService);

  public questions = signal<any[]>([]);

  async loadQuestions(){

    this.http.get<any>(this.apiQuiz).subscribe({

      next: (data) => {

        const finalQuestion = data.results.map((quez: any) => {

          const answers = [...quez.incorrect_answers,quez.correct_answer]
          .sort(() => Math.random() - 0.5);

          return {
            question: quez.question,
            correct_answer: quez.correct_answer,
            incorrect_answers: quez.incorrect_answers,
            answers: answers,
            category: quez.category,
            difficulty: quez.difficulty,
          }

        });

        this.questions.set(finalQuestion);

      }

    });

  }

  getQuestions(){
    return this.questions.asReadonly();
  }

  async sendData(data: dataQuiz){

    return await this.supabase
    .getClient()
    .from('quiz')
    .insert(data)
    .then(({ error }) => {

      if(error){
        console.log('error: ' + error.message);
      }

    });

  }

}
