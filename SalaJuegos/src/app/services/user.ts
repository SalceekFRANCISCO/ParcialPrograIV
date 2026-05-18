import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})

export class UserService  {
    private http: HttpClient = inject(HttpClient);
    private apiUser: string = 'https://api.github.com/users/SalceekFRANCISCO';

    private user = signal<User | null>(null);
    loading: WritableSignal<boolean> = signal<boolean>(false);
    error: WritableSignal<string | null> = signal<string | null>(null);

    loadUser(): void {
        this.loading.set(true);
        this.error.set(null);

        this.http.get<any>(this.apiUser).subscribe({
            next: (data) => {
                const finalUser: User = {
                    id: data.id,
                    name: data.name,
                    avatarUrl: data.avatar_url,
                    repos: data.public_repos,
                    location: data.location,
                    createdAt: data.created_at, 
                    isActive: true
                }
                this.user.set(finalUser);
                this.loading.set(false);
            },
            error: (_err) => {
                this.error.set('error al cargar el usuario');
                this.loading.set(false);
            }
        })

    }

    getUser(): Signal<User | null> {
        return this.user.asReadonly();
    }

    
}
