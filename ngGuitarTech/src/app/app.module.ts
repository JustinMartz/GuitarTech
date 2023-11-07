import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/landing/landing.component';
import { LoginRegisterModalComponent } from './components/login-register-modal/login-register-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { GuitarsComponent } from './components/guitars/guitars.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SetupsComponent } from './components/setups/setups.component';
import { GuitarDetailComponent } from './components/guitar-detail/guitar-detail.component';
import { GuitarDetailIconsComponent } from './components/guitar-detail-icons/guitar-detail-icons.component';
import { GuitarTopNavComponent } from './components/guitar-top-nav/guitar-top-nav.component';
import { DeleteGuitarModalComponent } from './components/delete-guitar-modal/delete-guitar-modal.component';
import { SelfClosingGuitarDeleteAlertComponent } from './components/self-closing-guitar-delete-alert/self-closing-guitar-delete-alert.component';
import { UpdateGuitarModalComponent } from './components/update-guitar-modal/update-guitar-modal.component';
import { AddGuitarModalComponent } from './components/add-guitar-modal/add-guitar-modal.component';
import { FilterGuitarColorModalComponent } from './components/filter-guitar-color-modal/filter-guitar-color-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingComponent,
    LoginRegisterModalComponent,
    MainComponent,
    GuitarsComponent,
    NotFoundComponent,
    SetupsComponent,
    GuitarDetailComponent,
    GuitarDetailIconsComponent,
    GuitarTopNavComponent,
    DeleteGuitarModalComponent,
    SelfClosingGuitarDeleteAlertComponent,
    UpdateGuitarModalComponent,
    AddGuitarModalComponent,
    FilterGuitarColorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
