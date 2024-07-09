import { Injectable, inject, signal } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, user } from '@angular/fire/auth';

import { Observable, from } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestoreService = inject(FirestoreService)

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  userFire: User | null = null;

  constructor() {
    this.user$.subscribe(
      (user) => {
        this.userFire = user;
        if (user) {
          this.firestoreService.obtenerInfoUsuario(user.uid)
            .then((finalUser) => {
              this.currentUserSignal.set(finalUser);
            });
        }
        else {
          this.currentUserSignal.set(null);
        }
      }
    );
  }

  singIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => { });
    return from(promise);
  }

  singUp(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(
      res => {
        const newUser = { uid: res.user.uid, email: email, username: username, role: "empleado" };
        this.firestoreService.AddData('users', newUser);
      });
    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
  
  async isLoggedIn() : Promise<boolean> {
    const timeLimit = 10000;
    const interval = 100;
    let time = 0;
    let user = this.currentUserSignal();

    while (typeof user === typeof undefined && time < timeLimit) {
      await new Promise(resolve => setTimeout(resolve, interval));
      user = this.currentUserSignal();
      time += interval;
    }
  
    if(user)
      return true;

    return false;
  }

}
