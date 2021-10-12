import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UnitsComponent } from './pages/admin/units/units.component';

const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
