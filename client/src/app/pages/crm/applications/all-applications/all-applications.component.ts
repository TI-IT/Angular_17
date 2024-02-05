import {Component, OnInit, ViewChild} from '@angular/core';
import {ICreateApplications} from "../../../../typeScript/interfaces";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {ApiApplicationsService} from "../../../../services/api/api-applications.service";
import {ApplicationsService} from "../../../../services/applications.service";
import {MatDialog} from "@angular/material/dialog";
import {GlobalService} from "../../../../services/global.service";
import {AuthService} from "../../../../services/auth.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {AddApplicationsComponent} from "../add-applications/add-applications.component";
import {
  ApplicationsProductsSelectComponent
} from "../../products/applications-products-select/applications-products-select.component";
import {UpdateApplicationsComponent} from "../update-applications/update-applications.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormatPhonePipe} from "../../pipes/format-phone.pipe";
import {DatePipe} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconButton,
    MatSortModule,
    MatIcon,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatFormField,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    FormatPhonePipe,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatPaginator,
    MatTooltip
  ],
  templateUrl: './all-applications.component.html',
  styleUrl: './all-applications.component.scss'
})
export class AllApplicationsComponent implements OnInit {
  isMobile:boolean = false;
  createApplications: ICreateApplications[] = []
  dataSource!: MatTableDataSource<ICreateApplications>
  applicationsFormatView = this._applicationsService.applicationsFormatView
  userRole = this._authService.userRoles

  displayedColumns: string[] = [
    'applicationNumber',
    'clientsName',
    'numberPhone',
    'typesJobsName',
    'addressObject',
    'description',
    'applicationSourceName',
    'createDate',
    'action',
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private _apiService: ApiApplicationsService,
    private _applicationsService: ApplicationsService,
    private _dialog: MatDialog,
    private _globalService: GlobalService,
    private _authService: AuthService,
    private _snackBarService: GlobalSnackBarService,
  ) {
  }

  ngOnInit() {
    this.getApplicationsList()
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize.bind(this));
  }
  checkWindowSize() {
    this.isMobile = window.innerWidth <= 767;
  }

  getApplicationsList() {
    this.createApplications=[]
    this._apiService.getAll('applications')
      .subscribe({
        next: (res: []) => {
          if (res.length > 0) {
            res.map(obj => {
              const _clientsId = obj['_clientsId'] ? obj['_clientsId']['_id'] : '';
              const clientsName = obj['_clientsId'] ? obj['_clientsId']['clientsName'] : '';
              const numberPhone = obj['_clientsId'] ? obj['_clientsId']['numberPhone'] : '';
              const email = obj['_clientsId'] ? obj['_clientsId']['email'] : '';
              const typesJobsName = obj['_typesJobsId'] ? obj['_typesJobsId']['typesJobsName'] : '';
              const applicationSourceName = obj['_applicationSourceId'] ? obj['_applicationSourceId']['applicationSourceName'] : '';
              const createObject: ICreateApplications = {
                _id: obj['_id'],
                applicationNumber: obj['applicationNumber'],
                _clientsId,
                clientsName,
                numberPhone,
                email,
                typesJobsName: typesJobsName,
                addressObject: obj['addressObject'],
                description: obj['description'],
                applicationSourceName: applicationSourceName,
                createDate: obj['createDate'],
              }
              this.createApplications.push(createObject)

              this.applicationsFormatView.update((val: any)=>(
                [...val,  val.push(createObject)]
              ))
            })
          }
          this.dataSource = new MatTableDataSource(this.createApplications)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error: (err) => {
          console.log(err)
        },
      })
  }

  deleteApplication(id: string) {
    this._apiService.delete(id, 'applications')
      .subscribe({
        next: (res) => {
          this._snackBarService.openSnackBar('Удаление успешна!', 'done');
          this.getApplicationsList()
        },
        error: console.log,
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  openCreateOrder(data: any){
    const dialogRef = this._dialog.open(ApplicationsProductsSelectComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.createApplications = []
          this.applicationsFormatView.set([]);
          this.getApplicationsList()
        }
      },
    });
  }

  openUpdateApplicationForm(data: any) {
    const dialogRef = this._dialog.open(UpdateApplicationsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.createApplications = []
          this.applicationsFormatView.set([]);
          this.getApplicationsList()
        }
      },
    });
  }

  openAddEditEmpForm() {
    // this.viewFormatPhone.set('')
    const dialogRef = this._dialog.open(AddApplicationsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.createApplications = []
          this.applicationsFormatView.set([]);
          this.getApplicationsList()
        }
      },
    });
  }
}

