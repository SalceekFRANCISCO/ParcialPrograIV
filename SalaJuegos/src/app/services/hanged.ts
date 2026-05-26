import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environments';
import { dataHanged } from '../models/hanged.model';

@Injectable({
  providedIn: 'root',
})
export class HangedServices {

  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(){}

  async sendData(data: dataHanged){

    return await this.supabase
      .from('hanged')
      .insert(data)
      .then(({ error }) => {

        if(error){

          console.log('error: ' + error.message);
        }
        
      });
  }
}