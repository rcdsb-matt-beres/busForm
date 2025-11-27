import { Routes } from '@angular/router';
import { ParentInfoFormComponent } from './parent-info-form/parent-info-form.component';
import { StudentInfoFormComponent } from './student-info-form/student-info-form.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ParentInfoFormComponent },
    { path: 'form', component: StudentInfoFormComponent },
    { path: 'success', component: SuccessComponent }
];
