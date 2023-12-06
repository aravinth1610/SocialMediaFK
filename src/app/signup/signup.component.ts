import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupDialogComponent } from '../dialog/signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalServices: NgbModal) { };

  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({
      email: ['', {
        validator: [Validators.required, Validators.email]
      }],
      name: ['', {
        validator: [Validators.required]
      }],
      password: ['', {
        validator: [Validators.required]
      }],
      phoneno: ['', {
        validator: [Validators.required]
      }]
    })
  }

  get email() { return this.signupFormGroup.get('email') };
  get name() { return this.signupFormGroup.get('name') };
  get password() { return this.signupFormGroup.get('password') };
  get phoneno() { return this.signupFormGroup.get('phoneno') };


  signupHandler() { }


  signupExists() {
    if (this.email || this.name || this.password || this.phoneno && !this.signupFormGroup.valid) {
      const modalRef = this.modalServices.open(SignupDialogComponent, { centered: true });
      modalRef.componentInstance.signupMessage = "Are you sure you want to exit";
      return false;
    } else {
      return true;
    }
  }


}
