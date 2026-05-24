import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HangedServices {

  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(){}

  async sendData(
    user_email: string,
    word: string,
    victory: boolean,
    lives: number,
    selected_letters: number,
    game_time: number
  ){

    return await this.supabase
      .from('hanged')
      .insert({
        user_email,
        word,
        victory,
        lives,
        selected_letters,
        game_time
      })
      .then(({ error }) => {

        if(error){

          console.log('error: ' + error.message);
        }
      });
  }
}