import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WrapperComponent} from "./wrapper/wrapper.component";
import {CustomMatModule} from "../../material-module";
import {RouterModule} from "@angular/router";
import {AdminRoutingModule} from "./admin-routing.module";
import {UnitsComponent} from "./units/units.component";
import {UnitsLinkComponent} from "./units-link/units-link.component";



@NgModule({
  declarations: [
    WrapperComponent,
    UnitsComponent,
    UnitsLinkComponent
  ],
  imports: [
    CommonModule,
    CustomMatModule,
    RouterModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }