import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

@Component({
  selector: 'app-parent-info-form',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './parent-info-form.component.html',
  styleUrl: './parent-info-form.component.css'
})
export class ParentInfoFormComponent {
  constructor(private router: Router, private formService: FormService) { }

  parentForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    emailAddress: new FormControl(),
    alternateEmailAddress: new FormControl(),
    typeOfTelephone: new FormControl(""),
    telephoneNumber: new FormControl(),
    alternateTypeOfTelephone: new FormControl(""),
    alternateTelephoneNumber: new FormControl()
  });

  onSubmit() {
    //Validations
    //First Name
    if (!this.parentForm.get('firstName')?.value) {
      alert("Please enter your first name.");
      return;
    }
    //Last Name
    if (!this.parentForm.get('lastName')?.value) {
      alert("Please enter your last name.");
      return;
    }
    //Email Address
    const email = this.parentForm.get('emailAddress')?.value;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    //Type of Telephone
    if (!this.parentForm.get('typeOfTelephone')?.value) {
      alert("Please select a type of telephone.");
      return;
    }
    //Telephone Number
    const phone = this.parentForm.get('telephoneNumber')?.value;
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      alert("Please enter your telephone number.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit telephone number (numbers only).");
      return;
    }

    //Save values in service
    this.formService.firstName.next(this.parentForm.get('firstName')?.value);
    this.formService.lastName.next(this.parentForm.get('lastName')?.value);
    this.formService.emailAddress.next(this.parentForm.get('emailAddress')?.value);
    this.formService.alternateEmailAddress.next(this.parentForm.get('alternateEmailAddress')?.value);
    this.formService.typeOfTelephone.next(this.parentForm.get('typeOfTelephone')?.value ?? '');
    this.formService.telephoneNumber.next(this.parentForm.get('telephoneNumber')?.value);
    this.formService.alternateTypeOfTelephone.next(this.parentForm.get('alternateTypeOfTelephone')?.value ?? '');
    this.formService.alternateTelephoneNumber.next(this.parentForm.get('alternateTelephoneNumber')?.value);

    //Go to student info form
    this.router.navigate(['/form']);
  }
}
