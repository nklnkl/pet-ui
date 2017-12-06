import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { AccountComponent } from '../components/account/account';
import { LoginComponent } from '../components/login/login';
import { PetComponent } from '../components/pet/pet';
import { SignUpComponent } from '../components/sign-up/sign-up';
import { NewPetComponent } from '../components/new-pet/new-pet';
import { PetsComponent } from '../components/pets/pets';
import { HttpService } from './http.service';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pet/:id', component: PetComponent },
  { path: 'new-pet', component: NewPetComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: '/pets', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    PetComponent,
    SignUpComponent,
    NewPetComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
