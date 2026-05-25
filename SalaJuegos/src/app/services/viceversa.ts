import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})

export class ViceversaService {
  private supabase = inject(SupabaseService);

  async sendData(user: string, duration: number){
    return await this.supabase
    .getClient()
    .from('viceversa')
    .insert({
      user_name: user,
      duration: duration
    }).then(({ error }) => {
        if(error){
          console.log('error: ' + error.message);
        }
  });

  }

}
