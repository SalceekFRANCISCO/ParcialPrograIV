import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environments";

@Injectable({providedIn: 'root'})

export class SupabaseService {

    private client: SupabaseClient;

    constructor(){
        const supabaseUrl = environment.supabaseUrl;
        const supabaseKey = environment.supabaseKey;
        this.client = createClient(supabaseUrl, supabaseKey,{
            auth: {persistSession: false}
        })
    }

    getClient(): SupabaseClient{
        return this.client;
    }

    async saveUserData(idUser: string, name: string, lastName: string, age: string, email: string ){
        const parsedAge = Number.parseInt(age);
        return  await this.client.from('users-data').insert({id: idUser, name: name, lastName: lastName, age: parsedAge, email: email }).then(({error, data}) => {
            if(error) console.log("error: " +error.message);
        }
    )}



    }

