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
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {AuthService} from "../../../../services/auth.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ApiProductsService} from "../../../../services/api/api-products.service";
import {AddProductsComponent} from "../add-products/add-products.component";
import {HttpClientModule} from "@angular/common/http";
import {AddOrderComponent} from "../../order/add-order/add-order.component";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    MatIconModule,
    HttpClientModule,
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
    'unit',
    'price',
    'currency',
    'description',
    'catalog',
    'categories',
    'Subcategories',
    'action',
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
    this.getProductsList();
  }

  getProductsList() {
    this._apiService.getAll('products').subscribe({
      next: (response) => {
        const products = response.data; // Предположим, что массив клиентов находится в свойстве `data`
        if (!Array.isArray(products)) {
          // Теперь проверяем, действительно ли products является массивом
          console.error('Expected an array of products, but did not receive one:', products);
          return;
        }
        this.dataSource = new MatTableDataSource<any>(products); // Initialize dataSource with an empty array
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

  deleteClients(id: string) {
    //Подготовыть Alert на вопрос удаления
    this._apiService.delete(id, 'products').subscribe({
      next: (res) => {
        this._snackBarService.openSnackBar('Employee deleted!', 'done');
        this.getProductsList();
      },
      error: console.log,
    });
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

//Создание КП
  openCreateOrder(data: any) {
    const dialogRef = this._dialog.open(AddOrderComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductsList();
        }
      },
    });
  }
//Редоктирование Товара
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddProductsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductsList();
        }
      },
    });
  }


}


