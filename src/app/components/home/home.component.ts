import { Component, inject } from '@angular/core';
import { GithubUser } from '../../interfaces/github-user.interface';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  githubService = inject(GithubService);
  profile : GithubUser | null = null;
  keys : string[] = []

  constructor () {
    this.githubService.GetUser().subscribe(
      {
        next: (profile) => {
          this.profile = profile;
          this.keys = Object.keys(profile);
        }
      }
    )
  }

}
