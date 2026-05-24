import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environments';
import { Mensaje } from '../models/message.model';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ChatService{
  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  private platformId = inject(PLATFORM_ID);

  public messages: WritableSignal<Mensaje[]> = signal([]);


  constructor(){
    this.listenMessage();
    this.loadMessages();
  }

  async loadMessages(){
    const {data} = await this.supabase.from('mensajes').select('*, users(user_name)').order('created_at', {ascending: true});

    // console.log(data);
    
    if(data){
      this.messages.set(data as Mensaje[]);
      
      this.messages().forEach(element => {
        console.log(element);
                  
      });
      
    }

  }

  listenMessage(){
    if(isPlatformBrowser(this.platformId)){
      this.supabase
      .channel('sala-de-chat')
      .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'mensajes'}
      , async (payload) => {
        this.loadMessages()
      })
      .subscribe()
    }
  }
 

  async sendMessage(content: string, user_name: string){
    const {data: usuarios} = await this.supabase
    .from('users')
    .select('id')
    .eq('user_name', user_name);

    let userId: number;

    if(!usuarios || usuarios.length === 0){
      const {data: nuevoUsuario, error} = await this.supabase
      .from('users')
      .insert({ user_name })
      .select()
      .single();

      if(error){
        console.error('error al cargar usuario:',error);
        return;
      }
      userId = nuevoUsuario.id;
    }
    else{
      userId = usuarios[0].id;
    }

    
    // console.log(content);

    await this.supabase.from('mensajes').insert({
      content: content,
      user_id: userId
    })


  }








}
