import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  getAll():any {
    return this.firestore.collection("products").snapshotChanges();
  }

  get(id: number):any {
    return  this.firestore.collection("products", ref => ref.where("codeBar", "==", id)).snapshotChanges();
  }

  getByCategory(value:string):any {
    return this.firestore.collection("products", ref => ref.where("category", "==", value)).snapshotChanges();
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
