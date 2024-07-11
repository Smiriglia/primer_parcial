import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import RepartidorInterface from '../interfaces/repartidor.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  AddData(colection: string, data : any) {
    let col = collection(this.firestore, colection);
    addDoc(col, data);
  }

  async obtenerInfoUsuario(uid:string) : Promise<UserInterface | null>
  {
    try
    {
      let col = collection(this.firestore, 'users');
      const consulta = query(col, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);

      if(consultaEjecuto.docs.length > 0)
      {
        console.log(consultaEjecuto.docs[0].data());
        return consultaEjecuto.docs[0].data() as any;
      }

      return null;
    }
    catch(error:any)
    {
      return null;
    }
  }
  
  async updateUser(uid:string, data: any)
  {
    try
    {
      let col = collection(this.firestore, 'users');
      const consulta = query(col, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);

      if(consultaEjecuto.docs.length > 0)
      {
        console.log(consultaEjecuto.docs[0].data());
        return updateDoc(consultaEjecuto.docs[0].ref, data);

      }

      return null;
    }
    catch(error:any)
    {
      return null;
    }
  }


}
