import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidebarOpened = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  sidebarOpen(){
    this.sidebarOpened = true;
  }

  sidebarClose(){
    this.sidebarOpened = false;
  }

  async logout(){
    try {
     await this.authService.logout()
    //  window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

}
