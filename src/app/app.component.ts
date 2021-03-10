import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shoppingcart';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authChange.subscribe( user => {
      if(user) {
        const returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
          localStorage.removeItem('returnUrl'); 
        if(returnUrl) this.router.navigate([returnUrl]);
      }
      }
    })
  }


}
