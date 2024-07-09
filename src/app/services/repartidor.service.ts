import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import RepartidorInterface from '../interfaces/repartidor.interface';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService {
  firestore = inject(Firestore);

  addRepartidor(Repartidor : RepartidorInterface) {
    let col = collection(this.firestore, 'repartidores');
    const promise = addDoc(col, Repartidor);

    return from(promise);
  }

  getRepartidores() {
    let col = collection(this.firestore, 'repartidores');
    return collectionData(col, { idField: 'id' }) as Observable<RepartidorInterface[]>;
  }
}
