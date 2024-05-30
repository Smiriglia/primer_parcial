import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => {
        if (user)
        {
          this.authService.currentUserSignal.set({
            uid: user.uid,
            email: user.email!,
            username: user.displayName ? user.displayName : "User" ,
          });
        }
        else
        {
          this.authService.currentUserSignal.set(null);
        }
      }
    );
  }

}
