import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js/dist/index.cjs';

@Injectable({
  providedIn: 'root',
})
export class HangedServices {
  private supabase = inject(SupabaseClient);

  async sendData(id: number, user_email:string, word: string, victory: boolean, lives: number, selected_letters: number, game_time: number){
    return await this.supabase.from('hanged').insert(
      {
        id: id, 
        user_email: user_email,
        word: word,
        victory: victory,
        lives: lives,
        selected_letters: selected_letters,
        game_time: game_time
      }).then(({error}) => {
            if(error) console.log("error: " +error.message);
        }
    )}




}
