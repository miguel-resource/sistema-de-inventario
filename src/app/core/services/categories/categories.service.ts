import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll():any {
    return this.firestore.collection("categories").snapshotChanges();
  }

  get(id: string ):any {
    return  this.firestore.collection("categories").doc(id).snapshotChanges();
  }

  getCategory(id:string):any {
    return this.firestore.collection("categories").doc(id).snapshotChanges();
  }

  create(data: any):any {
    return this.firestore.collection("categories").add(data);
  }

  update(id:string | undefined, data:any):any {
    return this.firestore.collection("cardsHome").doc(id).update(data);
  }
   delete(id:string | undefined):any {
    return this.firestore.collection("cardsHome").doc(id).delete();
  }



}
