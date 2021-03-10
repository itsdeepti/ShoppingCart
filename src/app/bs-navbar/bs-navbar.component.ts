import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Product } from '../Models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy, OnInit {
  public user: firebase.default.User;
  private authStateSubscription: Subscription;
  sumCart: number = 0;


  constructor(private auth: AuthService, private UserService: UserService, private ShoppingCartService: ShoppingCartService) {
    this.authStateSubscription = this.auth.authChange.subscribe(user => {
      this.user = user;
      this.UserService.save(user);

    });

  }
  ngOnInit() {
    this.ShoppingCartService.getCart().subscribe((resp: {quantity: number }[]) => {
      if (resp) {
        const products = resp || [];
        this.sumCart = 0;
        for (var product of products) {
          if (product)
            this.sumCart = this.sumCart + product.quantity; 
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
