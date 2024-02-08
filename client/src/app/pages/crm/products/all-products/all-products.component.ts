import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {AuthService} from "../../../../services/auth.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ApiProductsService} from "../../../../services/api/api-products.service";
import {AddProductsComponent} from "../add-products/add-products.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatIcon,
    MatInput,
    MatDialogActions,
    MatDialogClose,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSortModule,
    MatIconButton,
    RouterLink,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    DatePipe,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  userRole = this._authService.userRoles

  displayedColumns: string[] = [
    // '_id',
    'name',
    'vendorCode',
    'imageSrc',
    'drawingImageSrc',
    'price',
    'currency',
    'description',
    'unit',
    'catalog',
    'categories',
    'Subcategories',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _apiService: ApiProductsService,
    private _snackBarService: GlobalSnackBarService,
    private _authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.getProductsList()
  }

  getProductsList() {
    this._apiService.getAll('products').subscribe({
        next: (response) => {
          console.log(response)
          const products = response.data; // Предположим, что массив клиентов находится в свойстве `data`
          if (!Array.isArray(products)) {
            // Теперь проверяем, действительно ли products является массивом
            console.error('Expected an array of products, but did not receive one:', products);
            return;
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      error: (err) => {
          console.log(err);
          }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddProductsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductsList();
        }
      },
    });
  }


}


