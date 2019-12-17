import { AddCourseComponent } from './addCourse/addCourse.component';
import { CourseDetailsComponent } from './courseDetails/courseDetails.component';
import { RegisterComponent } from './register/register.component';
import { RegisterLayoutComponent } from './layouts/register-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';

const routes: Routes = [
  {
    path: 'details', component: CourseDetailsComponent
  },
  {
    path: 'addCourse', component: AddCourseComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: RegisterLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
