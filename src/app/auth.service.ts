import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChange: Observable<firebase.default.User>;

  constructor(private auth: AngularFireAuth) { 
    this.authChange = this.auth.authState;
  }

  login() {
    this.auth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
