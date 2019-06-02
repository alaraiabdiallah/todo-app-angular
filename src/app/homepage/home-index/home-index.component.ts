import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'homepage-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.auth.redirectWhenUnauthenticated()
   }

  ngOnInit() { }

}
