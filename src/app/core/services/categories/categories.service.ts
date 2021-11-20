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

  get(id: string | undefined):any {
    return  this.firestore.collection("categorio").doc(id).get();
  }

  getProduct(id:string):any {
    return this.firestore.collection("products").doc(id).get();
  }

  create(data: any):any {
    return this.firestore.collection("categorio").add(data);
  }

  update(id:string | undefined, data:any):any {
    return this.firestore.collection("cardsHome").doc(id).update(data);
  }

  delete(id:string | undefined):any {
    return this.firestore.collection("cardsHome").doc(id).delete();
  }



}
