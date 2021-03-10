import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from './Models/app-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.default.User) {
    if (user != null) {
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
      })
    }
  }
  get(user:firebase.default.User): Observable<AppUser> {
    return this.db.object('/users/'+ user.uid).valueChanges() as Observable<AppUser>;
  }
}
