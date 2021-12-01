import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarShopService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll():any {
    return this.firestore.collection("carShop").snapshotChanges();
  }

  get(id: string ):any {
    return  this.firestore.collection("carShop").doc(id).snapshotChanges();
  }

  getCategory(id:string):any {
    return this.firestore.collection("carShop").doc(id).snapshotChanges();
  }

  create(data: any):any {
    return this.firestore.collection("carShop").add(data);
  }

  update(id:string | undefined, data:any):any {
    return this.firestore.collection("carShop").doc(id).update(data);
  }

  delete():any {
    return this.firestore.collection("carShop").get();
  }

}
