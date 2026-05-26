import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';
import { dataGreater } from '../models/greater-or-lesser.model';

@Injectable({
  providedIn: 'root'
})
export class greaterOrLesserService {

  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() {}

  async sendData(data: dataGreater) {

    return await this.supabase
      .from('greater-or-lesser')
      .insert(data);

    }

  }