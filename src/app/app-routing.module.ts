import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'todo',
    loadChildren: './todo-app/todo-app.module#TodoAppModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
