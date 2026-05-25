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

  async sendData(user_email: string, word: string, victory: boolean, lives: number, selected_letters: number, duration: number){

    return await this.supabase
      .from('hanged')
      .insert({
        word: word,
        victory: victory,
        lives: lives,
        selected_letters: selected_letters,
        duration: duration,
        user_email: user_email,
      })
      .then(({ error }) => {

        if(error){

          console.log('error: ' + error.message);
        }
        
      });
  }
}