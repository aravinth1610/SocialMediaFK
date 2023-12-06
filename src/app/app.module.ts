import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { AuthInterceptorInterceptor } from './authInterceptor/auth-interceptor.interceptor';
import { SignupComponent } from './signup/signup.component';
import { SignupDialogComponent } from './dialog/signup-dialog/signup-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
//npm i ng-angular-popup
//ng add @ng-bootstrap/ng-bootstrap

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    SignupDialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgbModule
  
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass: AuthInterceptorInterceptor,multi:true},
    SignupDialogComponent
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
