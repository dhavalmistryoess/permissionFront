import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { AppAdminRoutingModule } from './app-admin-routing.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { AppAdminComponent } from './app-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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
import { UserHistoryComponent } from './user-history/user-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserCertificateDetailComponent } from './user-certificate-detail/user-certificate-detail.component';
import { DocumentVertificationRequestComponent } from './document-vertification-request/document-vertification-request.component';
import { UserPendingVerificationComponent } from './user-pending-verification/user-pending-verification.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { TestComponent } from './test/test.component';
import { FullexaminationsheetComponent } from './fullexaminationsheet/fullexaminationsheet.component';
var AppAdminModule = /** @class */ (function () {
    function AppAdminModule() {
    }
    AppAdminModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppAdminComponent,
                DashboardComponent,
                SidebarComponent,
                CountryComponent,
                CountryListComponent,
                CountryListDummyComponent,
                StateComponent,
                StateListComponent,
                InquireListComponent,
                ActivityLogComponent,
                ErrorLogComponent,
                EmailLogComponent,
                ConfigurationComponent,
                EmailTemplateComponent,
                EmailTemplateListComponent,
                DocumentComponent,
                DocumentListComponent,
                CategoryComponent,
                CategoryListComponent,
                DiscountCouponComponent,
                DiscountCouponListComponent,
                EligibilityItemComponent,
                EligibilityItemListComponent,
                CertificateComponent,
                CertificateListComponent,
                CertificateCategoryMappingComponent,
                CertificateCategoryMappingListComponent,
                ItemComponent,
                ItemListComponent,
                ManageRegisterRequestComponent,
                UserInviteComponent,
                AssignAssessmentComponent,
                AssessmentListComponent,
                AssessmentDetailComponent,
                UserHistoryComponent,
                UserCertificateDetailComponent,
                DocumentVertificationRequestComponent,
                UserPendingVerificationComponent,
                AdminDashboardComponent,
                PaymentReportComponent,
                AssessmentReportComponent,
                FullScreenComponent,
                TestComponent,
                FullexaminationsheetComponent
            ],
            imports: [
                AppAdminRoutingModule,
                CommonModule,
                NgxPaginationModule,
                RouterModule,
                FormsModule,
                HttpClientModule,
                InputsModule, DropDownsModule, DateInputsModule, ButtonsModule, PopupModule, DialogsModule,
                PDFExportModule, GridModule, PDFModule, ExcelModule, ExcelExportModule,
            ],
            providers: [],
            bootstrap: [AppAdminComponent]
        })
    ], AppAdminModule);
    return AppAdminModule;
}());
export { AppAdminModule };
//# sourceMappingURL=app-admin.module.js.map