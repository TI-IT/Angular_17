import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {ApiClientsService} from "../../../../services/api/api-clients.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {ClientsService} from "../../../../services/clients.service";
import {AuthService} from "../../../../services/auth.service";
import {AddClientsComponent} from "../add-clients/add-clients.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {IClients} from "../../../../typeScript/interfaces";
import {AddApplicationsComponent} from "../../applications/add-applications/add-applications.component";

@Component({
  selector: 'app-all-clients',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatSortModule,
    MatInput,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    DatePipe,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.scss'
})
export class AllClientsComponent implements OnInit {
  viewFormatPhone = this._appService.viewFormatPhone
  formatNumberPhoneClientsList = this._appService.formatNumberPhoneClientsList
  userRole = this._authService.userRoles

  displayedColumns: string[] = [
    // '_id',
    'clientsName',
    'numberPhone',
    'password',
    'email',
    'role',
    'description',
    'createDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _apiService: ApiClientsService,
    private _snackBarService: GlobalSnackBarService,
    private _appService: ClientsService,
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    this.getClientsList();
  }

  openAddEditEmpForm() {
    this.viewFormatPhone.set('')
    const dialogRef = this._dialog.open(AddClientsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientsList();
        }
      },
    });
  }

  getClientsList() {
    this.formatNumberPhoneClientsList.set([])
    this._apiService.getAll('clients').subscribe({
      next: (response) => {
        const clients = response.data; // Предположим, что массив клиентов находится в свойстве `data`
        if (!Array.isArray(clients)) {
          // Теперь проверяем, действительно ли clients является массивом
          console.error('Expected an array of clients, but did not receive one:', clients);
          return;
        }
        clients.forEach((obj: IClients) => {
          // создание нового объекта с обновленным свойством Телефона
          const updatedObj = {
            ...obj,
            numberPhone:
              '+7(' +
              obj.numberPhone.slice(0, 3) +
              ') ' +
              obj.numberPhone.slice(3, 6) +
              '-' +
              obj.numberPhone.slice(6, 8) +
              '-' +
              obj.numberPhone.slice(8),
          };
          // добавление нового объекта в массив
          this.formatNumberPhoneClientsList().push(updatedObj);
        });
        this.dataSource = new MatTableDataSource(this.formatNumberPhoneClientsList());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteClients(id: string) {
    //Подготовыть Alert на вопрос удаления
    this._apiService.delete(id, 'clients').subscribe({
      next: (res) => {
        this._snackBarService.openSnackBar('Employee deleted!', 'done');
        this.getClientsList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddClientsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientsList();
        }
      },
    });
  }
  openCreateApplication(data: any) {
    const dialogRef = this._dialog.open(AddApplicationsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientsList();
        }
      },
    });
  }
}
