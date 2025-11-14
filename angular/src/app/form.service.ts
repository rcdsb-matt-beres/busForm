import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() { }

  firstName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  lastName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailAddress: BehaviorSubject<string> = new BehaviorSubject<string>("");
  alternateEmailAddress: BehaviorSubject<string> = new BehaviorSubject<string>("");
  typeOfTelephone: BehaviorSubject<string> = new BehaviorSubject<string>("");
  telephoneNumber: BehaviorSubject<string> = new BehaviorSubject<string>("");
  alternateTypeOfTelephone: BehaviorSubject<string> = new BehaviorSubject<string>("");
  alternateTelephoneNumber: BehaviorSubject<string> = new BehaviorSubject<string>("");
}
