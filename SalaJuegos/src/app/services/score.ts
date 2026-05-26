import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { dataQuiz } from '../models/apiquiz.model';
import { dataHanged } from '../models/hanged.model';
import { dataViceversa } from '../models/viceversa.model';
import { dataGreater } from '../models/greater-or-lesser.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {

  private supabase = inject(SupabaseService);

  userQuiz = signal<dataQuiz[]>([]);
  userHanged = signal<dataHanged[]>([]);
  userViceversa = signal<dataViceversa[]>([]);
  userGreater = signal<dataGreater[]>([]);

  async getDataQuiz() {

    const { data, error } = await this.supabase
      .getClient()
      .from('quiz')
      .select('*')
      .order('correct_answers', { ascending: false });

    if (error) {

      console.log('error quiz: ' + error.message);

    } else {

      this.userQuiz.set(data ?? []);

    }
  }

  async getDataHanged() {

    const { data, error } = await this.supabase
      .getClient()
      .from('hanged')
      .select('*')
      .order('selected_letters', { ascending: false });

    if (error) {

      console.log('error hanged: ' + error.message);

    } else {

      this.userHanged.set(data ?? []);

    }
  }

  async getDataViceversa() {

    const { data, error } = await this.supabase
      .getClient()
      .from('viceversa')
      .select('*')
      .order('duration', { ascending: true });

    if (error) {

      console.log('error viceversa: ' + error.message);

    } else {

      this.userViceversa.set(data ?? []);

    }
  }

  async getDataGreaterOrLesser() {

    const { data, error } = await this.supabase
      .getClient()
      .from('greater-or-lesser')
      .select('*')
      .order('streak', { ascending: false });

    if (error) {

      console.log('error greater or lesser: ' + error.message);

    } else {

      this.userGreater.set(data ?? []);

    }
  }




}