import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormService } from '../form.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-info-form',
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './student-info-form.component.html',
  styleUrl: './student-info-form.component.css'
})
export class StudentInfoFormComponent {
  studentForm = new FormGroup({});
  emailMap = new Map<string, string>();

  constructor(private cdr: ChangeDetectorRef, public formService: FormService, private http: HttpClient) {
    this.studentForm.addControl('schoolType', new FormControl());
    this.studentForm.addControl('schoolList', new FormControl(""));
    this.studentForm.addControl('firstName1', new FormControl());
    this.studentForm.addControl('lastName1', new FormControl());
    this.studentForm.addControl('gradeLevel1', new FormControl(""));
    this.studentForm.addControl('dateOfBirth1', new FormControl());
    this.studentForm.addControl('oen1', new FormControl());
    this.studentForm.addControl('newHomeAddress', new FormControl());
    this.studentForm.addControl('removePickUp', new FormControl());
    this.studentForm.addControl('newPickUp', new FormControl());
    this.studentForm.addControl('removeDropOff', new FormControl());
    this.studentForm.addControl('newDropOff', new FormControl());
    this.studentForm.addControl('other', new FormControl());
    this.studentForm.addControl('otherInfo', new FormControl());

    //Add emails for each school
    this.emailMap.set("adh", "adhsec@rcdsb.on.ca");
    this.emailMap.set("ajc", "ajcsec@rcdsb.on.ca");
    this.emailMap.set("adm", "admsec@rcdsb.on.ca");
    this.emailMap.set("bch", "bchsec@rcdsb.on.ca");
    this.emailMap.set("cen", "censec@rcdsb.on.ca");
    this.emailMap.set("cds", "cdssec@rcdsb.on.ca");
    this.emailMap.set("cob", "cobsec@rcdsb.on.ca");
    this.emailMap.set("egn", "egnsec@rcdsb.on.ca");
    this.emailMap.set("fhs", "fhssec@rcdsb.on.ca");
    this.emailMap.set("hrm", "hrmsec@rcdsb.on.ca");
    this.emailMap.set("hvw", "hvwsec@rcdsb.on.ca");
    this.emailMap.set("kil", "kilsec@rcdsb.on.ca");
    this.emailMap.set("mcn", "mcnsec@rcdsb.on.ca");
    this.emailMap.set("mes", "mesec@rcdsb.on.ca");
    this.emailMap.set("mhs", "mhssec@rcdsb.on.ca");
    this.emailMap.set("mve", "mvesec@rcdsb.on.ca");
    this.emailMap.set("mvs", "mvssec@rcdsb.on.ca");
    this.emailMap.set("ohs", "ohssec@rcdsb.on.ca");
    this.emailMap.set("pal", "palsec@rcdsb.on.ca");
    this.emailMap.set("pvw", "pvwsec@rcdsb.on.ca");
    this.emailMap.set("qel", "qelsec@rcdsb.on.ca");
    this.emailMap.set("rci", "rcisec@rcdsb.on.ca");
    this.emailMap.set("rck", "rcksec@rcdsb.on.ca");
    this.emailMap.set("ves", "vesec@rcdsb.on.ca");
    this.emailMap.set("vhs", "vhssec@rcdsb.on.ca");
    this.emailMap.set("wzd", "wzdsec@rcdsb.on.ca");
    this.emailMap.set("wps", "wpssec@rcdsb.on.ca");
  }

  numberOfStudents: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  inputs: number[] = [0];

  addAdditionalStudent() {
    const newCount = this.numberOfStudents.value + 1;
    this.numberOfStudents.next(newCount);
    this.inputs = Array.from(Array(newCount).keys());
    this.studentForm.addControl("firstName" + newCount, new FormControl());
    this.studentForm.addControl("lastName" + newCount, new FormControl());
    this.studentForm.addControl("gradeLevel" + newCount, new FormControl(""));
    this.studentForm.addControl("dateOfBirth" + newCount, new FormControl());
    this.studentForm.addControl("oen" + newCount, new FormControl());
    this.cdr.detectChanges();
  }

  removeAdditionalStudent() {
    const currentCount = this.numberOfStudents.value - 1;
    this.numberOfStudents.next(currentCount);
    this.inputs = Array.from(Array(currentCount).keys());
    this.studentForm.removeControl("firstName" + (currentCount + 1));
    this.studentForm.removeControl("lastName" + (currentCount + 1));
    this.studentForm.removeControl("gradeLevel" + (currentCount + 1));
    this.studentForm.removeControl("dateOfBirth" + (currentCount + 1));
    this.studentForm.removeControl("oen" + (currentCount + 1));
  }


  onSubmit() {
    //Validations
    //School type
    if (!this.studentForm.get('schoolType')?.value) {
      alert("Please select a school type.");
      return;
    }

    //School list
    if (!this.studentForm.get('schoolList')?.value) {
      alert("Please select a school.");
      return;
    }

    //Loop students
    const totalStudents = this.numberOfStudents.value;
    for (let i = 1; i <= totalStudents; i++) {
      if (!this.studentForm.get('firstName' + i)?.value) {
        alert("Please enter the first name for student " + i + ".");
        return;
      }
      if (!this.studentForm.get('lastName' + i)?.value) {
        alert("Please enter the last name for student " + i + ".");
        return;
      }
      if (!this.studentForm.get('gradeLevel' + i)?.value) {
        alert("Please enter the grade level for student " + i + ".");
        return;
      }
      if (!this.studentForm.get('dateOfBirth' + i)?.value) {
        alert("Please enter the date of birth for student " + i + ".");
        return;
      }
    }

    //Changes
    if (!this.studentForm.get('newHomeAddress')?.value &&
      !this.studentForm.get('removePickUp')?.value &&
      !this.studentForm.get('newPickUp')?.value &&
      !this.studentForm.get('removeDropOff')?.value &&
      !this.studentForm.get('newDropOff')?.value &&
      !this.studentForm.get('other')?.value) {
      alert("Please specify at least one change to be made.");
      return;
    }

    //Build email
    let emailString: string = "";
    emailString += "Parent/Guardian Information:\n";
    emailString += "First Name: " + this.formService.firstName.value + "\n";
    emailString += "Last Name: " + this.formService.lastName.value + "\n";
    emailString += "Email Address: " + this.formService.emailAddress.value + "\n";
    emailString += "Alternate Email Address: " + this.formService.alternateEmailAddress.value + "\n";
    emailString += "Type of Telephone: " + this.formService.typeOfTelephone.value + "\n";
    emailString += "Telephone Number: " + this.formService.telephoneNumber.value + "\n";
    emailString += "Alternate Type of Telephone: " + this.formService.alternateTypeOfTelephone.value + "\n";
    emailString += "Alternate Telephone Number: " + this.formService.alternateTelephoneNumber.value + "\n";
    emailString += "School Type: " + this.studentForm.get("schoolType")?.value + "\n";
    emailString += "School Name: " + this.studentForm.get("schoolList")?.value + "\n\n";
    emailString += "Student Information:\n";
    for (let i = 1; i <= totalStudents; i++) {
      emailString += "Student " + i + ":\n";
      emailString += "First Name: " + this.studentForm.get("firstName" + i)?.value + "\n";
      emailString += "Last Name: " + this.studentForm.get("lastName" + i)?.value + "\n";
      emailString += "Grade Level: " + this.studentForm.get("gradeLevel" + i)?.value + "\n";
      emailString += "Date of Birth: " + this.studentForm.get("dateOfBirth" + i)?.value + "\n";
      emailString += "OEN: " + this.studentForm.get("oen" + i)?.value + "\n\n";
    }
    emailString += "Requested Changes:\n";
    if (this.studentForm.get('newHomeAddress')?.value) {
      emailString += "New Home Address\n";
    }
    if (this.studentForm.get('removePickUp')?.value) {
      emailString += "Remove Pick-Up Location\n";
    }
    if (this.studentForm.get('newPickUp')?.value) {
      emailString += "New Pick-Up Location\n";
    }
    if (this.studentForm.get('removeDropOff')?.value) {
      emailString += "Remove Drop-Off Location\n";
    }
    if (this.studentForm.get('newDropOff')?.value) {
      emailString += "New Drop-Off Location\n";
    }
    if (this.studentForm.get('other')?.value) {
      emailString += "Other\n";
    }
    emailString += "\nAdditional Information:\n";
    emailString += this.studentForm.get('otherInfo')?.value + "\n"

    //Debug: show email content
    const schoolCode = this.studentForm.get("schoolList")?.value ?? "";
    const schoolEmail = this.emailMap.get(schoolCode) ?? "";
    console.log("Email to be sent to: admissions@rcdsb.on.ca" + (schoolEmail ? ", " + schoolEmail : ""));
    console.log(emailString);

    //Send email
    let apiUrl = 'http://localhost:3000/api/send-email';
    this.http.post(apiUrl, { address: "beresm@rcdsb.on.ca", body: emailString }).subscribe(resp => {
      console.log(resp);
    });
  }

  goBack() {
    window.history.back();
  }
}
