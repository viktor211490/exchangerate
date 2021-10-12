import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-exchange-rate';

  constructor(private router: Router){}

  isAdmin() {
    return this.router.url.includes("admin");

  }
}
