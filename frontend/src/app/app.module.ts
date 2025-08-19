import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddCourierComponent } from './courier/add-courier/add-courier.component';
import { ListCourierComponent } from './courier/list-courier/list-courier.component';
import { DeleteCourierComponent } from './courier/delete-courier/delete-courier.component';
import { CourierService } from './courier/courier.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './courier/checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddCourierComponent },
  { path: 'list', component: ListCourierComponent },
  { path: 'delete', component: DeleteCourierComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'login', component: LoginComponent },   
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCourierComponent,
    ListCourierComponent,
    DeleteCourierComponent,
    AboutUsComponent,
    ContactUsComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    CheckoutComponent,
    ProfileComponent,

  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CourierService],
  bootstrap: [AppComponent]
})
export class AppModule { }