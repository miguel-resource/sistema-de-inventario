import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll(): any {
    return this.firestore.collection("shopping", ref => ref.orderBy("date", "desc")).snapshotChanges();
  }

  get(id: string | undefined): any {
    return this.firestore.collection("shopping").doc(id).get();
  }

  getByCategory(id: string): any {
    return this.firestore.collection("shopping", ref => ref.where("category", "==", id)).snapshotChanges();
  }

  create(data: any): any {
    return this.firestore.collection("shopping").add(data);
  }

  update(id: string | undefined, data: any): any {
    return this.firestore.collection("shopping").doc(id).update(data);
  }


  delete(): any {
    return this.firestore.collection("shopping").get();
  }
}
