import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {

  @Input() signupMessage: string;
  constructor(public activeModal: NgbActiveModal) { }


  save(){
    console.log("---");
    
  }

}
