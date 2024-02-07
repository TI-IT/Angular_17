import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ApiProductService} from "../../../../services/api/api-product.service";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {response} from "express";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HttpClientModule, DatePipe, MatButton, MatCell, MatCellDef, MatColumnDef, MatFormField, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatIconButton, MatInput, MatLabel, MatPaginator, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {

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
  openAddEditEmpForm = signal<any | null>(null);

  constructor(
    private _dialog: MatDialog,
    private _apiService: ApiProductService,
    private _snackBarService: GlobalSnackBarService,
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
}


