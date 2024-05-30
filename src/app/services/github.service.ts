import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GithubUser } from '../interfaces/github-user.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  http = inject(HttpClient);

  GetUser() {
    return this.http.get<GithubUser>(`https://api.github.com/users/smiriglia`);
  }
  
}
