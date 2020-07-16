import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorClassService } from './http-interceptor-class.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InquireComponent } from './inquire/inquire.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { EligibilityTestComponent } from './eligibility-test/eligibility-test.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { AssessmentPanelComponent } from './assessment-panel/assessment-panel.component';
import { PracticeTestComponent } from './practice-test/practice-test.component';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ProctorDashboardComponent } from './proctor-dashboard/proctor-dashboard.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { ProctorListComponent } from './proctor-list/proctor-list.component';
import { LegalComponent } from './legal/legal.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { AssessmentPanelChangesComponent } from './assessment-panel-changes/assessment-panel-changes.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    InquireComponent,
    NotificationsComponent,
    PagenotfoundComponent,
    RegisterComponent,
    EligibilityTestComponent,
    SidebarComponent,
    CertificateDetailComponent,
    ResultPageComponent,
    AssessmentPanelComponent,
    PracticeTestComponent,
    AssessmentResultComponent,
    ProctorDashboardComponent,
    AttendanceSheetComponent,
    ProctorListComponent,
    LegalComponent,
    TermConditionsComponent,
    PrivacyPolicyComponent,
    CookiePolicyComponent,
    TermsOfUseComponent,
    AssessmentPanelChangesComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputsModule, DropDownsModule, DateInputsModule, ButtonsModule, PopupModule,
    PDFExportModule, GridModule, PDFModule, ExcelModule, ExcelExportModule, DialogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
