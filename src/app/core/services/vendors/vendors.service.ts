import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private firestore: AngularFirestore
  ){}

  getAll():any {
    return this.firestore.collection("vendors").snapshotChanges();
  }

  get(id: string | undefined):any {
    return  this.firestore.collection("vendors").doc(id).get();
  }

  create(data: any):any {
    return this.firestore.collection("vendors").add(data);
  }

  update(id:string | undefined, data:any):any {
    return this.firestore.collection("cardsHome").doc(id).update(data);
  }

  delete(id:string | undefined):any {
    return this.firestore.collection("cardsHome").doc(id).delete();
  }


}
