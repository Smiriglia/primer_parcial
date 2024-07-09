import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IHelado } from '../interfaces/helado.interface';

@Injectable({
  providedIn: 'root'
})
export class HeladoService {
  firestore = inject(Firestore);
  
  addHelado(helado : IHelado) {
    let col = collection(this.firestore, 'helados');
    const promise = addDoc(col, helado);

    return from(promise);
  }

  getHelados() {
    let col = collection(this.firestore, 'helados');
    return collectionData(col, { idField: 'id' }) as Observable<IHelado[]>;
  }

  updateHelado(helado: IHelado, data : any) {
    let docPelicula = doc(this.firestore, 'helados', helado.id!);
    return updateDoc(docPelicula, data);
  }

  delete(helado : IHelado) {
    let docPelicula = doc(this.firestore, 'helados', helado.id!);
    return deleteDoc(docPelicula);
  }
}
