import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';
import { GreaterOrLesserInterface } from '../models/greater-or-lesser.model';

@Injectable({
  providedIn: 'root'
})
export class greaterOrLesserService {

  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() {}

  async saveGame(game: GreaterOrLesserInterface) {

    const { data, error } = await this.supabase
      .from('greater-or-lesser')
      .insert(game);

    if (error) {

      console.error('Error saving game', error);

      return;
    }

    console.log('Game saved', data);
  }
}