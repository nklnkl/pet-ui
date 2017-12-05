import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AccountComponent } from '../components/account/account';
import { LoginComponent } from '../components/login/login';
import { PetComponent } from '../components/pet/pet';
import { SignUpComponent } from '../components/sign-up/sign-up';
import { NewPetComponent } from '../components/new-pet/new-pet';
import { PetsComponent } from '../components/pets/pets';

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
    FormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
