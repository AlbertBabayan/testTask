import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepoForksComponent, HomeComponent } from './components';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'forks', component: RepoForksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
