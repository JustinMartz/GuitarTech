import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GuitarsComponent } from './components/guitars/guitars.component';
import { SetupsComponent } from './components/setups/setups.component';
import { AppComponent } from './app.component';
import { LoginRegisterModalComponent } from './components/login-register-modal/login-register-modal.component';
import { DesktopViewComponent } from './components/desktop-view/desktop-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: '/', component: AppComponent },
  // { path: 'landing', component: LandingComponent },
  { path: 'guitars', component: GuitarsComponent},
  { path: 'setups', component: SetupsComponent},
  { path: 'login', component: LoginRegisterModalComponent},
  { path: 'desktop', component: DesktopViewComponent},
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: AppComponent } //page not found route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
