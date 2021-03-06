import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  this.fir

  getAll():any {
    return this.firestore.collection("products").snapshotChanges();
  }

  get(id: string | undefined):any {
    return  this.firestore.collection("products").doc(id).snapshotChanges();
  }

  getByCategory(id:string):any {
    return this.firestore.collection("products", ref => ref.where("category", "==", id)).snapshotChanges();
  }

  create(data: any):any {
    return this.firestore.collection("products").add(data);
  }


  update(id:string | undefined, data:any):any {
    return this.firestore.collection("products").doc(id).update(data);
  }
  delete(id:string | undefined):any {
    return this.firestore.collection("products").doc(id).delete();
  }

}
