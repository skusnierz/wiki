import { SearchPipe } from './pipe/search.pipe';
import { CourseComponent } from './courses/course.component';
import { UserService } from './services/user.service';
import { RegisterLayoutComponent } from './layouts/register-layout.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilterComponent } from './filter/filter.component';
import { CourseDetailsComponent } from './courseDetails/courseDetails.component';
import { NavBarComponent } from './navBar/navBar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { AddCourseComponent } from './addCourse/addCourse.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditCourseComponent } from './editCourse/editCourse.component';
import { NgxStarsModule } from 'ngx-stars';
import { RatingModule } from 'node_modules/ngx-rating';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    RegisterLayoutComponent,
    RegisterComponent,
    HomeComponent,
    CourseComponent,
    FilterComponent,
    CourseDetailsComponent,
    NavBarComponent,
    AddCourseComponent,
    EditCourseComponent,
    SearchPipe
  ],
  imports: [
    NgbModule,
    FormsModule,
    RatingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    Ng5SliderModule,
    NgSelectModule,
    NgxStarsModule,
    RatingModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    SearchPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
