import { Injectable, inject, signal } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, user } from '@angular/fire/auth';

import { Observable, from } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestoreService = inject(FirestoreService);
  router = inject(Router);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  userFire: User | null = null;

  constructor() {
    this.user$.subscribe(
      (user) => {
        this.userFire = user;
        this.loadUserData();
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

  loadUserData() {
    return new Promise((resolve, reject) => {
      if (this.userFire) {
        this.firestoreService.obtenerInfoUsuario(this.userFire.uid)
          .then((finalUser) => {
            this.currentUserSignal.set(finalUser);
            if(!finalUser?.aceptoTerminos)
              this.router.navigateByUrl('/aceptar-terminos');
            resolve(true);
        });
      }
      else {
        this.currentUserSignal.set(null);
        resolve(false);
      }
    });
  }

  aceptarTerminos() {
    return new Promise((resolve, reject) => {
      this.firestoreService.updateUser(this.currentUserSignal()!.uid, {
        aceptoTerminos: true,
      })
      .then(
        () => {
          return this.loadUserData()
          .then((val) => {
            resolve(val);
          });
          
        }
      )
      .catch((err) => {
        console.log(err);
        resolve(false);
      });
    })
  }

}
