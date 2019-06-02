import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth = {
    email: '',
    password: ''
  }

  isOnLogin = false

  errorMessage: string

  constructor(private authService: AuthService, private router: Router) { 
    const { authState } = this.authService.afAuth
    authState.subscribe( user => {
      if (user) this.router.navigate(['/todo'])
    })
  }

  ngOnInit() { }

  doLogin() {
    this.isOnLogin = true
    setTimeout(() => this._doLogin(), 200);
  }

  private async _doLogin() {
    try {
      const auth = await this.authService.login(this.auth);
      this.router.navigate(['/todo'])
    } catch (err) {
      this._errorLoginHandler(err)
      this.isOnLogin = false
    }
    
  }

  private _errorLoginHandler(err) {
    switch (err.code) {
      case 'auth/user-not-found':
        this.errorMessage = "Your email is not registered"
        break;
      case 'auth/wrong-password':
        this.errorMessage = "Your password is wrong"
        break;
      default:
        this.errorMessage = err.message
      break;
    }

  }

}
