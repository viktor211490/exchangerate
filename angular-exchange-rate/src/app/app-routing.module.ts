import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {ExchangeCardComponent} from "./pages/exchange-card/exchange-card.component";


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'card',
        component: ExchangeCardComponent,
      }
    ]
  },
  {path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
  {
    path: '**',
    redirectTo: '/card',
    pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
