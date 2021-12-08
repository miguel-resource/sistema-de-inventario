import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll(): any {
    return this.firestore.collection("notification").snapshotChanges();
  }
}
