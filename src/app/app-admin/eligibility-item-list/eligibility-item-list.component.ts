import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EligibilityItemService } from '../services/eligibility-item.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-eligibility-item-list',
  templateUrl: './eligibility-item-list.component.html',
  styleUrls: ['./eligibility-item-list.component.css']
})
export class EligibilityItemListComponent implements OnInit {

  eligibilityItemList;
  exportName;
  auto;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private EligibilityItemService: EligibilityItemService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public sort: SortDescriptor[] = [{
    field: 'CertificateName',
    dir: 'asc'
  }];

  ngOnInit() {


    // if ($("content_block").height() < 500) {
    //   alert("hi");
    //   $('footer').addClass("footer_fixed");
    // }

    // var div = $("content_block").height();
    // var win = $(window).height();

    // if (div < win) {
    //   //alert("hi");
    //   $("footer").addClass('fixed_footer');
    // }




    this.globals.isLoading = false;
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–DocumentVerification–' + todaysdate;
    this.eligibilityItemList = [];
    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });
    //new PerfectScrollbar('.content_height');
    this.EligibilityItemService.getAll()
      .then((data) => {
        // let todaysdate = this.globals.todaysdate;
        // setTimeout(function () {
        //   var table = $('#dataTables-example').DataTable({

        //     scrollCollapse: true,
        //     "oLanguage": {
        //       "sLengthMenu": "_MENU_ Eligibility Items per page",
        //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Eligibility Items",
        //       "sInfoFiltered": "(filtered from _MAX_ total Eligibility Items)",
        //       "sInfoEmpty": "Showing 0 to 0 of 0 Eligibility Items"
        //     },
        //     "aoColumnDefs": [
        //       { 'bSortable': false, 'aTargets': [6, 7] }
        //     ],
        //     dom: 'lBfrtip',
        //     buttons: [
        //       {
        //         extend: 'excel',
        //         title: 'Assessment – All Eligibility Items – ' + todaysdate,
        //         filename: 'Assessment–AllEligibilityItems–' + todaysdate,

        //         customize: function (xlsx) {
        //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        //           source.setAttribute('name', 'Assessment-AllEligibilityItems');
        //         },
        //         exportOptions: {
        //           columns: [0, 1, 2, 3, 4, 5]
        //         }
        //       },
        //       {
        //         extend: 'print',
        //         title: 'Assessment – All Eligibility Item – ' + todaysdate,
        //         exportOptions: {
        //           columns: [0, 1, 2, 3, 4, 5]
        //         }
        //       },
        //     ]
        //   });

        //   $(".buttons-print").append("<i class='fa fa-print'></i>");
        //   $('.buttons-print').attr('title', 'Print');
        //   $('.buttons-print').attr('data-toggle', 'tooltip');
        //   $('.buttons-print').attr('data-placement', 'top');
        //   $(".buttons-excel").append("<i class='fa fa-file-excel-o'></i>");
        //   $('.buttons-excel').attr('title', 'Export to Excel');
        //   $('.buttons-excel').attr('data-toggle', 'tooltip');
        //   $('.buttons-excel').attr('data-placement', 'top');
        // }, 100);
        // setTimeout(function () {
        //   $('select').selectpicker();
        // }, 1000);
        // if (data) {
        //   this.eligibilityItemList = data;
        // }
        // this.globals.isLoading = false;
        this.gridData = data;
        this.eligibilityItemList = data;
        console.log(this.eligibilityItemList);
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          // if (error.text) {
          //   swal({
          //     //position: 'top-end',
          //     type: 'error',
          //     title: 'Oops...',
          //     text: "Something went wrong!"
          //   })
          // }
          this.globals.pageNotfound(error.error.code);
        });
  }

  edit(id) {
    this.router.navigate(['/admin/eligibility-item/edit/' + window.btoa(id)]);
  }


  deleteEligibilityItem(eligibilityItem) {
    swal({
      title: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          eligibilityItem.UserId = this.globals.authData.UserId;
          eligibilityItem.Id = eligibilityItem.EligibilityItemId;
          eligibilityItem.TableName = 'tblmsteligibilityitems';
          eligibilityItem.FieldName = 'EligibilityItemId';
          eligibilityItem.Module = 'Eligibility Item';
          eligibilityItem.ActivityText = 'Delete Eligibility Item';
          eligibilityItem.ModuleId = 2;
          this.globals.isLoading = true; debugger
          this.CommonService.deleteItem(eligibilityItem)
            .then((data) => {
              var eligibilityItemList = [...this.eligibilityItemList];
              let index = eligibilityItemList.indexOf(eligibilityItem);
              if (index != -1) {
                eligibilityItemList.splice(index, 1);
              }
              this.eligibilityItemList = [...eligibilityItemList];
              this.gridData = this.eligibilityItemList;
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.eligibilityItem.list.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
            },
              (error) => {
                this.globals.isLoading = false;
                // if (error.text) {
                //   swal({
                //     //position: 'top-end',
                //     type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //     title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //     text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   })
                // }
                this.globals.pageNotfound(error.error.code);
              });
        }
      })
  }


  isActiveChange(changeEntity, i) {
    if (i) {
      changeEntity.IsActive = 1;
    } else {
      changeEntity.IsActive = 0;
    }
    this.globals.isLoading = true;
    changeEntity.UpdatedBy = this.globals.authData.UserId;
    changeEntity.Id = changeEntity.EligibilityItemId;
    changeEntity.TableName = 'tblmsteligibilityitems';
    changeEntity.FieldName = 'EligibilityItemId';
    changeEntity.Module = 'Eligibility Item';
    changeEntity.ModuleId = 2;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Document Activated";
    }
    else {
      changeEntity.ActivityText = "Document Deactivated";
    }
    this.CommonService.isActiveChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == false) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.eligibilityItem.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.eligibilityItem.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.eligibilityItem.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.eligibilityItem.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.eligibilityItem.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.eligibilityItem.list.alerts.activeSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
          // if (this.eligibilityItemList[i].IsActive == true) {
          //   $('#active' + i).prop("checked", true);
          // }
          // else {
          //   $('#active' + i).prop("checked", false);
          // }
        });
  }

  toggleValueChange(changeEntity, i) {debugger
    if (i) {
      changeEntity.AnswerForEligibility = 1;
      changeEntity.fieldValue = 1;
    } else {
      changeEntity.AnswerForEligibility = 0;
      changeEntity.fieldValue = 0;
    }
    this.globals.isLoading = true;
    changeEntity.UpdatedBy = this.globals.authData.UserId;
    changeEntity.Id = changeEntity.EligibilityItemId;
    changeEntity.TableName = 'tblmsteligibilityitems';
    changeEntity.FieldName = 'EligibilityItemId';
    changeEntity.Module = 'Eligibility Item';
    changeEntity.field = 'AnswerForEligibility';
    changeEntity.ModuleId = 2;
    if (changeEntity.AnswerForEligibility == 1) {
      changeEntity.ActivityText = "Answer For Eligibility Activated";
    }
    else {
      changeEntity.ActivityText = "Answer For Eligibility Deactivated";
    }
    this.CommonService.toggleValueChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.AnswerForEligibility == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityDeactiveSuccess.type,
            title: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityDeactiveSuccess.title,
            text: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityDeactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityActiveSuccess.type,
            title: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityActiveSuccess.title,
            text: this.globals.adminTranslationText.eligibilityItem.list.alerts.answerForEligibilityActiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  public onFilter(inputValue: string): void {
    this.eligibilityItemList = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'CertificateName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'VersionName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'EligibilityItemFor',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'EligibilityItemText',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
