import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Globals } from './globals';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorClassService } from './http-interceptor-class.service';

// components
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
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
import { ProctorDashboardComponent } from './proctor-dashboard/proctor-dashboard.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { ProctorListComponent } from './proctor-list/proctor-list.component';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';
import { LegalComponent } from './legal/legal.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { AssessmentPanelChangesComponent } from './assessment-panel-changes/assessment-panel-changes.component';

// services
import { AuthService } from './services/auth.service';
import { AuditLogService } from './services/audit-log.service';
import { InquireService } from './services/inquire.service';
import { NotificationService } from './services/notification.service';
import { PasswordService } from './services/password.service';
import { ProfileService } from './services/profile.service';
import { AuthGuard } from './services/auth-guard.service';
import { EligibilityTestService } from './services/eligibility-test.service';
import { RegisterService } from './services/register.service';
import { DashboardService } from './services/dashboard.service';
import { AssessmentPanelService } from './services/assessment-panel.service';
import { PracticeTestService } from './services/practice-test.service';
import { ResultPageService } from './services/result-page.service';
import { ProctorDashboardService } from './services/proctor-dashboard.service';
const routes: Routes = [
    {
        path: 'admin',
        loadChildren: './app-admin/app-admin.module#AppAdminModule'
    },
    { path: 'register/:id', component: RegisterComponent, canActivate: [AuthGuard] },//,canActivate: [AuthGuard]
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'eligibility-test', component: EligibilityTestComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login/:id', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
    { path: 'reset-password/:id', component: ResetPasswordComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile/:addressadd/:certificateid', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'profile/:addressadd', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'inquire', component: InquireComponent },//, canActivate: [AuthGuard]
    { path: 'certificateDetails/:usercertificateid/:schedule', component: CertificateDetailComponent, canActivate: [AuthGuard] },
    { path: 'certificateDetails/:usercertificateid', component: CertificateDetailComponent, canActivate: [AuthGuard] },
    { path: 'practice-result/:id', component: ResultPageComponent, canActivate: [AuthGuard] },
    { path: 'assessment-result/:id', component: AssessmentResultComponent, canActivate: [AuthGuard] },
    { path: 'assessmentPanel/:certificateid/:usercertificateid/:ScheduleAssessmentId/:UserAssessmentId/:resultStatus/:parentAssessment/:HasSubCertificate/:HasOneShotAssessment', component: AssessmentPanelComponent, canActivate: [AuthGuard] },
    { path: 'practice-test/:certificateid/:usercertificateid/:userpracticetestid/:flag/:HasOneShotAssessment', component: PracticeTestComponent, canActivate: [AuthGuard] },
    { path: 'proctorDashboard', component: ProctorDashboardComponent, canActivate: [AuthGuard] },
    { path: 'proctorDashboard/:id', component: ProctorDashboardComponent, canActivate: [AuthGuard] },
    { path: 'attendanceSheet', component: AttendanceSheetComponent, canActivate: [AuthGuard] },
    { path: 'proctorList', component: ProctorListComponent, canActivate: [AuthGuard] },
    { path: 'legal', component: LegalComponent, canActivate: [AuthGuard] },
    { path: 'termconditions', component: TermConditionsComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: 'cookiePolicy', component: CookiePolicyComponent },

    { path: 'pagenotfound/:code', component: PagenotfoundComponent, canActivate: [AuthGuard] },
    { path: 'pagenotfound', component: PagenotfoundComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Globals, AuthService, AuditLogService, InquireService, NotificationService, PasswordService, ProfileService, AuthGuard, EligibilityTestService, RegisterService, DashboardService, ProctorDashboardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorClassService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppRoutingModule { }