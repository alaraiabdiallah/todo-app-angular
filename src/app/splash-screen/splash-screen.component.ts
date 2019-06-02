import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    const { authState } = this.authService.afAuth
    setTimeout(() => {
      authState.subscribe(user => {
          
        if (user) this.router.navigate(['/todo'])
        else this.router.navigate(['/auth/login'])
      })
    }, 300);
  }

  ngOnInit() {
  }

}
