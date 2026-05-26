import { Component, inject } from '@angular/core';
import { ScoreService } from '../../services/score';

@Component({
  selector: 'app-scores',
  imports: [],
  templateUrl: './scores.html',
  styleUrl: './scores.css',
})
export class Scores {
  public scoresService = inject(ScoreService);

  dataHanged = this.scoresService.getDataHanged();
  dataGreater = this.scoresService.getDataGreaterOrLesser();
  dataViceversa = this.scoresService.getDataViceversa();
  dataQuiz = this.scoresService.getDataQuiz();




}
