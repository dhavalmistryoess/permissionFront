import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../services/item.service";
import { CommonService } from "../services/common.service";
import {
  DataBindingDirective,
  PageChangeEvent,
  GridDataResult,
  DataStateChangeEvent
} from "@progress/kendo-angular-grid";
import {
  SortDescriptor,
  orderBy,
  process,
  State
} from "@progress/kendo-data-query";
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"]
})
export class ItemListComponent implements OnInit {
  exportName;
  itemList: any;
  pageSize = this.globals.pageSize;
  allowUnsort = true;
  skip = 0;
  paginationEntity = {
    limit: this.pageSize,
    offset: 1,
    searchData: {
      status: "",
      searchQuery: ""
    },
    sortOrder: [
      {
        field: "CategoryName",
        dir: "asc"
      }
    ]
  };
  state = {
    skip: 0,
    take: this.pageSize
  };
  sort: SortDescriptor[] = [
    {
      field: "CategoryName",
      dir: "asc"
    }
  ];

  constructor(
    public globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
    private ItemService: ItemService,
    private CommonService: CommonService
  ) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  ngOnInit() {
    this.globals.isLoading = true;
    let todaysdate = this.globals.todaysdate;
    this.exportName = "Assessment–AllItems–" + todaysdate;
    this.getItemData();
  }

  // getItemData Listing
  getItemData() {
    this.ItemService.getItemAll(this.paginationEntity).then(
      (data: any) => {
        this.itemList = {
          data: data.totalRecord > 0 ? orderBy(data.result, this.sort) : "",
          total: data.totalRecord
        };
        this.globals.isLoading = false;
        console.log(this.itemList);
      },
      error => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      }
    );
  }

  // pageChange Event
  public pageChange(event: PageChangeEvent): void {
    this.globals.isLoading = true;
    this.skip = event.skip;
    this.paginationEntity.offset = event.skip / this.pageSize + 1;
    this.getItemData();
  }

  // sortOrder change Event
  public sortChange(sort: any): void {
    if (sort.dir != "undefined") {
      this.sort = sort;
      this.paginationEntity.sortOrder = [];
      this.paginationEntity.sortOrder = sort;
      this.getItemData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if (inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery = inputValue;
      this.getItemData();
    } else {
      this.paginationEntity.searchData.searchQuery = "";
      this.pageChange(this.state);
    }
  }

  edit(id) {
    this.router.navigate(["/admin/item/edit/" + window.btoa(id)]);
  }

  deleteItem(item) {
    swal({
      title: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
        .title,
      text: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
        .text,
      icon: "warning",
      type: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
        .type,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        item.UserId = this.globals.authData.UserId;
        item.Id = item.ItemId;
        item.TableName = "tblmstitem";
        item.FieldName = "ItemId";
        item.Module = "Item";
        item.ModuleId = 2;
        item.ActivityText = "Delete Item";
        this.globals.isLoading = true;
        debugger;
        this.CommonService.deleteItem(item).then(
          data => {
            this.getItemData();
            this.globals.isLoading = false;
            swal({
              type: this.globals.adminTranslationText.item.list.alerts
                .deleteSuccess.type,
              title: this.globals.adminTranslationText.item.list.alerts
                .deleteSuccess.title,
              text: this.globals.adminTranslationText.item.list.alerts
                .deleteSuccess.text,
              showConfirmButton: false,
              timer: 4000
            });
          },
          error => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          }
        );
      }
    });
  }

  isActiveChange(changeEntity, i) {
    if (i) {
      changeEntity.IsActive = 1;
    } else {
      changeEntity.IsActive = 0;
    }
    this.globals.isLoading = true;
    changeEntity.UpdatedBy = this.globals.authData.UserId;
    changeEntity.Id = changeEntity.ItemId;
    changeEntity.TableName = "tblmstitem";
    changeEntity.FieldName = "ItemId";
    changeEntity.Module = "Item";
    changeEntity.ModuleId = 2;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Item Activated";
    } else {
      changeEntity.ActivityText = "Item Deactivated";
    }
    this.CommonService.isActiveChange(changeEntity).then(
      data => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.item.list.alerts
              .deactiveSuccess.type,
            title: this.globals.adminTranslationText.item.list.alerts
              .deactiveSuccess.title,
            text: this.globals.adminTranslationText.item.list.alerts
              .deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          });
        } else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.item.list.alerts
              .activeSuccess.type,
            title: this.globals.adminTranslationText.item.list.alerts
              .activeSuccess.title,
            text: this.globals.adminTranslationText.item.list.alerts
              .activeSuccess.text,
            showConfirmButton: false,
            timer: 4000
          });
        }
      },
      error => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      }
    );
  }

  toggleValueChange(changeEntity, i) {
    debugger;
    if (i) {
      changeEntity.IsNoScoreItem = 1;
      changeEntity.fieldValue = 1;
    } else {
      changeEntity.IsNoScoreItem = 0;
      changeEntity.fieldValue = 0;
    }
    this.globals.isLoading = true;
    changeEntity.UpdatedBy = this.globals.authData.UserId;
    changeEntity.Id = changeEntity.ItemId;
    changeEntity.TableName = "tblmstitem";
    changeEntity.FieldName = "ItemId";
    changeEntity.Module = "Item";
    changeEntity.field = "IsNoScoreItem";
    changeEntity.ModuleId = 2;
    if (changeEntity.IsNoScoreItem == 1) {
      changeEntity.ActivityText = "Is No Score Item Activated";
    } else {
      changeEntity.ActivityText = "Is No Score Item Deactivated";
    }
    this.CommonService.toggleValueChange(changeEntity).then(
      data => {
        this.globals.isLoading = false;
        if (changeEntity.IsNoScoreItem == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.item.list.alerts
              .isNoScoredeactiveSuccess.type,
            title: this.globals.adminTranslationText.item.list.alerts
              .isNoScoredeactiveSuccess.title,
            text: this.globals.adminTranslationText.item.list.alerts
              .isNoScoredeactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          });
        } else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.item.list.alerts
              .isNoScoreactiveSuccess.type,
            title: this.globals.adminTranslationText.item.list.alerts
              .isNoScoreactiveSuccess.title,
            text: this.globals.adminTranslationText.item.list.alerts
              .isNoScoreactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          });
        }
      },
      error => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      }
    );
  }
}
