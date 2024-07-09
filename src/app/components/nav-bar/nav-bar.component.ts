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
export class NavBarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn() {
    return this.authService.currentUserSignal() != null;
  }

  isAdmin() {
    return this.isLoggedIn() && this.authService.currentUserSignal()?.role == 'admin';
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/home');
  }
}
