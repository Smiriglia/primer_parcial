import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  AddData(colection: string, data : any) {
    let col = collection(this.firestore, colection);
    addDoc(col, data);
  }

  GetLogins(){
    let col = collection(this.firestore, 'logins');
    
    const observable = collectionData(col);

    return observable;
  }

  async obtenerInfoUsuario(uid:string)
  {
    try
    {
      let col = collection(this.firestore, 'users');
      const consulta = query(col, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      let datos = false;
      consultaEjecuto.forEach((datos) => 
      {
        return datos.data();
      });   
      return null;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }
}
