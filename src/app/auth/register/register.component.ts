import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  auth = {
    email: '',
    password: ''
  }

  isOnRegistering = false

  errorMessage: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  doRegister() {
    this.isOnRegistering = true
    setTimeout(() => this._doRegister(), 200);
  }

  private async _doRegister() {
    try {
      const reg = await this.authService.register(this.auth);
      this.router.navigate(['/auth/login'])
    } catch (err) {
      this._errorRegisterHandler(err)
      this.isOnRegistering = false
    }

  }

  private _errorRegisterHandler(err) {
    this.errorMessage = err.message
  }

}
