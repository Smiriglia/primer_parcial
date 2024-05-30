import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const appConfig: ApplicationConfig = {
  
  providers: [
    importProvidersFrom([
      HttpClientModule,
    ]),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({ "projectId": "primer-parcial-ec919",
    "appId": "1:1025388251761:web:6bdd8f4510c4e0d7ed29d0",
    "storageBucket": "primer-parcial-ec919.appspot.com",
    "apiKey": "AIzaSyCUW8Wal4TY4e6lFVXfvdlrayRmrJ7Mkns",
    "authDomain": "primer-parcial-ec919.firebaseapp.com",
    "messagingSenderId": "1025388251761" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()),
    DatePipe,
  ]

};
