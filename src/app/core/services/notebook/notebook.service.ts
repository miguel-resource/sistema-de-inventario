import { Injectable } from '@angular/core';
import { Notebook } from './../../models/notebook.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {



  constructor(
    private firestore: AngularFirestore
  ) {
  }

  getAll():any {
    return this.firestore.collection("notebook").snapshotChanges();
  }

  get(id: string | undefined):any {
    return  this.firestore.collection("notebook").doc(id).get();
  }

  create(data: any):any {
    return this.firestore.collection("notebook").add(data);
  }


  update(id:string | undefined, data:any):any {
    return this.firestore.collection("cardsHome").doc(id).update(data);
  }

  delete(id:string | undefined):any {
    return this.firestore.collection("cardsHome").doc(id).delete();
  }

}
