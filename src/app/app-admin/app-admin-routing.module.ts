import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Globals } from '../globals';
import { AppAdminComponent } from './app-admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorClassService } from '../http-interceptor-class.service';


// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListDummyComponent } from './country-list-dummy/country-list-dummy.component';
import { StateComponent } from './state/state.component';
import { StateListComponent } from './state-list/state-list.component';
import { InquireListComponent } from './inquire-list/inquire-list.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ErrorLogComponent } from './error-log/error-log.component';
import { EmailLogComponent } from './email-log/email-log.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DiscountCouponComponent } from './discount-coupon/discount-coupon.component';
import { DiscountCouponListComponent } from './discount-coupon-list/discount-coupon-list.component';
import { EligibilityItemComponent } from './eligibility-item/eligibility-item.component';
import { EligibilityItemListComponent } from './eligibility-item-list/eligibility-item-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateCategoryMappingComponent } from './certificate-category-mapping/certificate-category-mapping.component';
import { CertificateCategoryMappingListComponent } from './certificate-category-mapping-list/certificate-category-mapping-list.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ManageRegisterRequestComponent } from './manage-register-request/manage-register-request.component';
import { UserInviteComponent } from './user-invite/user-invite.component';
import { AssignAssessmentComponent } from './assign-assessment/assign-assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { UserPendingVerificationComponent } from './user-pending-verification/user-pending-verification.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { TestComponent } from './test/test.component';
import { FullexaminationsheetComponent } from './fullexaminationsheet/fullexaminationsheet.component';

// services
import { AuthGuard } from '../services/auth-guard.service';
import { CommonService } from './services/common.service';
import { CountryService } from './services/country.service';
import { DashboardService } from './services/dashboard.service';
import { StateService } from './services/state.service';
import { ConfigurationService } from './services/configuration.service';
import { EmailTemplateService } from './services/email-template.service';
import { DocumentService } from './services/document.service';
import { CategoryService } from './services/category.service';
import { DiscountCouponService } from './services/discount-coupon.service';
import { EligibilityItemService } from './services/eligibility-item.service';
import { CertificateService } from './services/certificate.service';
import { CertificateCategoryMappingService } from './services/certificate-category-mapping.service';
import { ItemService } from './services/item.service';
import { UserInviteService } from './services/user-invite.service';
import { ManageRegisterRequestService } from './services/manage-register-request.service';
import { AssisgnAssessmentService } from './services/assisgn-assessment.service';
import { UserCertificateDetailComponent } from './user-certificate-detail/user-certificate-detail.component';
import { DocumentVertificationRequestComponent } from './document-vertification-request/document-vertification-request.component';
import { UserhistoryService } from './services/userhistory.service';
import { UserHistoryComponent } from './user-history/user-history.component';
import { AssessmentdetailService } from './services/assessmentdetail.service';
import { ItemOptionChangesComponent } from './item-option-changes/item-option-changes.component';
import { PermissionComponent } from './permission/permission.component';
const routes: Routes = [
    {
        path: '',
        component: AppAdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },

            { path: 'country/add', component: CountryComponent, canActivate: [AuthGuard] },
            { path: 'country/edit/:id', component: CountryComponent, canActivate: [AuthGuard] },
            { path: 'country/list', component: CountryListComponent, canActivate: [AuthGuard] },
            { path: 'country-list-dummy', component: CountryListDummyComponent, canActivate: [AuthGuard] },

            { path: 'state/add', component: StateComponent, canActivate: [AuthGuard] },
            { path: 'state/edit/:id', component: StateComponent, canActivate: [AuthGuard] },
            { path: 'state/list', component: StateListComponent, canActivate: [AuthGuard] },

            { path: 'inquire/list', component: InquireListComponent, canActivate: [AuthGuard] },
            { path: 'settings', component: ConfigurationComponent, canActivate: [AuthGuard] },

            { path: 'email-template/add', component: EmailTemplateComponent, canActivate: [AuthGuard] },
            { path: 'email-template/edit/:id', component: EmailTemplateComponent, canActivate: [AuthGuard] },
            { path: 'email-template/list', component: EmailTemplateListComponent, canActivate: [AuthGuard] },

            { path: 'error-log', component: ErrorLogComponent, canActivate: [AuthGuard] },
            { path: 'activity-log', component: ActivityLogComponent, canActivate: [AuthGuard] },
            { path: 'email-log', component: EmailLogComponent, canActivate: [AuthGuard] },

            { path: 'document/add', component: DocumentComponent, canActivate: [AuthGuard] },
            { path: 'document/edit/:id', component: DocumentComponent, canActivate: [AuthGuard] },
            { path: 'document/list', component: DocumentListComponent, canActivate: [AuthGuard] },

            { path: 'category/add', component: CategoryComponent, canActivate: [AuthGuard] },
            { path: 'category/edit/:id', component: CategoryComponent, canActivate: [AuthGuard] },
            { path: 'category/list', component: CategoryListComponent, canActivate: [AuthGuard] },

            { path: 'discount-coupon/add', component: DiscountCouponComponent, canActivate: [AuthGuard] },
            { path: 'discount-coupon/edit/:id', component: DiscountCouponComponent, canActivate: [AuthGuard] },
            { path: 'discount-coupon/list', component: DiscountCouponListComponent, canActivate: [AuthGuard] },

            { path: 'eligibility-item/add', component: EligibilityItemComponent, canActivate: [AuthGuard] },
            { path: 'eligibility-item/edit/:id', component: EligibilityItemComponent, canActivate: [AuthGuard] },
            { path: 'eligibility-item/list', component: EligibilityItemListComponent, canActivate: [AuthGuard] },

            { path: 'certificate/add', component: CertificateComponent, canActivate: [AuthGuard] },
            { path: 'certificate/edit/:id', component: CertificateComponent, canActivate: [AuthGuard] },
            { path: 'certificate/list', component: CertificateListComponent, canActivate: [AuthGuard] },

            { path: 'certificate-category-mapping/add', component: CertificateCategoryMappingComponent, canActivate: [AuthGuard] },
            { path: 'certificate-category-mapping/edit/:id/:categoryid/:flag', component: CertificateCategoryMappingComponent, canActivate: [AuthGuard] },
            { path: 'certificate-category-mapping/edit/:id/:categoryid', component: CertificateCategoryMappingComponent, canActivate: [AuthGuard] },
            { path: 'certificate-category-mapping/list/:certificateid', component: CertificateCategoryMappingListComponent, canActivate: [AuthGuard] },
            { path: 'certificate-category-mapping/list', component: CertificateCategoryMappingListComponent, canActivate: [AuthGuard] },

            { path: 'item/add', component: ItemComponent, canActivate: [AuthGuard] },
            { path: 'item/edit/:id', component: ItemComponent, canActivate: [AuthGuard] },
            // { path: 'item/add', component: ItemOptionChangesComponent, canActivate: [AuthGuard] }, //new component 
            // { path: 'item/edit/:id', component: ItemOptionChangesComponent, canActivate: [AuthGuard] },
            { path: 'item/list', component: ItemListComponent, canActivate: [AuthGuard] },

            { path: 'user-invite', component: UserInviteComponent, canActivate: [AuthGuard] },
            //{ path: 'item/list', component: ItemListComponent, canActivate: [AuthGuard] },
            { path: 'userHistory', component: UserHistoryComponent, canActivate: [AuthGuard] },

            { path: 'userHistory/:id', component: UserHistoryComponent, canActivate: [AuthGuard] },
            
            { path: 'manage-register-request', component: ManageRegisterRequestComponent, canActivate: [AuthGuard] },

            { path: 'assignAssessment/:scheduleHistoryId', component: AssignAssessmentComponent, canActivate: [AuthGuard] },

            { path: 'assessment-list/:hasproctor', component: AssessmentListComponent, canActivate: [AuthGuard] },
            { path: 'assessment-list', component: AssessmentListComponent, canActivate: [AuthGuard] },
            { path: 'assessmentDetails/:userAssessmentId/:hasproctor', component: AssessmentDetailComponent, canActivate: [AuthGuard] },

            { path: 'userCertificateDetail/:id/:pagename', component: UserCertificateDetailComponent, canActivate: [AuthGuard] },
            { path: 'documentVerificationList', component: DocumentVertificationRequestComponent, canActivate: [AuthGuard] },
            { path: 'userPendingVerification', component: UserPendingVerificationComponent, canActivate: [AuthGuard] },

            { path: 'paymentReport', component: PaymentReportComponent, canActivate: [AuthGuard] },
            { path: 'assessmentReport', component: AssessmentReportComponent, canActivate: [AuthGuard] },

            { path: 'examinationSheet', component: FullexaminationsheetComponent, canActivate: [AuthGuard] },
            { path: 'permission', component: PermissionComponent, canActivate: [AuthGuard] },

            { path: 'fullScreen', component: FullScreenComponent, canActivate: [AuthGuard] },
            { path: 'test', component: FullScreenComponent, canActivate: [AuthGuard] },
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            // { path: '**', redirectTo: 'dashboard' }
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [Globals, AuthGuard, CommonService, ConfigurationService, DashboardService, CountryService, StateService, EmailTemplateService, DocumentService,
        CategoryService, DiscountCouponService, AssessmentdetailService, UserhistoryService, EligibilityItemService, CertificateService, CertificateCategoryMappingService, ItemService, UserInviteService,
        ManageRegisterRequestService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorClassService,
            multi: true
        }
    ],
    bootstrap: [AppAdminComponent]
})

export class AppAdminRoutingModule { }