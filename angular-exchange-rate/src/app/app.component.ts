import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UnitService} from "../services/unit.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-exchange-rate';

  constructor(
    private router: Router,
    private unitService: UnitService,
  ){}

  isAdmin() {
    return this.router.url.includes("admin");

  }
}
