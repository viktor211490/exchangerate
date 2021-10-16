import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WrapperComponent} from "./wrapper/wrapper.component";
import {UnitsComponent} from "./units/units.component";
import {UnitsLinkComponent} from "./units-link/units-link.component";


const routers: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [

      {
        path: 'unit',
        component: UnitsComponent
      },
      {
        path: 'unitlinks',
        component: UnitsLinkComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
