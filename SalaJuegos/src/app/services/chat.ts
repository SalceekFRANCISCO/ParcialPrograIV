import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environments';
import { Mensaje } from '../models/user.model';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root',
})
export class ChatService{
  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  
  public messages: WritableSignal<Mensaje[]> = signal([]);


  constructor(){
    this.listenMessage();
    this.loadMessages();
  }

  async loadMessages(){
    const {data} = await this.supabase.from('mensajes').select('*, usuarios(user)').order('created_at', {ascending: true});

    if(data){
      this.messages.set(data as Mensaje[]);
    }

  }

  listenMessage(){
    this.supabase.channel('sala-de-chat').on('postgres_changes',{event: 'INSERT', schema: 'public', table: 'mensajes'},(payload) => {
      this.loadMessages()
    }).subscribe()
  }


  async sendMessage(content: string, userName: string){
    const {data: usuarios} = await this.supabase
    .from('usuarios')
    .select('id')
    .eq('username', userName);


    let user_id: number;

    if(!usuarios || usuarios.length === 0){
      const {data: nuevoUsuario, error} = await this.supabase.from('usuarios')
      .insert({userName})
      .select()
      .single();

      if(error){
        console.error('error al cargar usuario',error);
        
      }
      user_id = nuevoUsuario.id;
    }
    else{
      user_id = usuarios[0].id;
    }
    await this.supabase.from('mensajes').insert({content, user_id})
  }
}
