import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase';
import { dataViceversa } from '../models/viceversa.model';

@Injectable({
  providedIn: 'root',
})

export class ViceversaService {
  private supabase = inject(SupabaseService);

  async sendData(data: dataViceversa){

    return await this.supabase
    .getClient()
    .from('viceversa')
    .insert(data).then(({ error }) => {
        if(error){
          console.log('error: ' + error.message);
        }
  });

  }

}
