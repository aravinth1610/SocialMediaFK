import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginModal } from '../modal/login-modal';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private authServices: AuthService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', {
        validator: [Validators.required, Validators.email],
      }],
      password: ['', {
        validator: [Validators.required]
      }]
    })
  }
  get email() { return this.loginFormGroup.get('email') };
  get password() { return this.loginFormGroup.get('password') };


  handleLogin() {

    const loginModal = new LoginModal();

    loginModal.email = this.email.value;
    loginModal.password = this.password.value;
    console.log(loginModal);

    this.authServices.login(loginModal).subscribe({
      next: (response: void) => {
        this.authServices.showSuccess('Successfully Login');
        console.log(this.authServices.isUserLoggedIn());
        console.log(this.authServices.getAuthUser());
        console.log(this.authServices.getAuthUsername());
      },
      error: (errorResponse: HttpErrorResponse) => {
        const validationErrors = errorResponse.error.validationErrors;
        console.log(validationErrors);
        if (validationErrors != null) {
          Object.keys(validationErrors).forEach(key => {
            const formControl = this.loginFormGroup.get(key);
            if (formControl) {
              formControl.setErrors({
                serverError: validationErrors[key]
              });
            }
          })
        } else {
          this.authServices.showError('Username and Password is not Valid');
        }
      },
      // complete: () => {
      //   this.router.navigateByUrl('/profile');
      // }
    })



  }







}
