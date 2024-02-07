import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-table-crud',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatIcon,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './table-crud.component.html',
  styleUrl: './table-crud.component.scss'
})
export class TableCrudComponent implements OnInit{
  @Input() data:any[] = []
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: any = [];
  dataSource!: MatTableDataSource<any>;

  constructor(
  ) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.getDataKeys()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Забираем уникальные ключи из массива данных
  getDataKeys() {
    //массив ключей которых не нужно показывать
    const excludedKeys = ['_id', 'password', '__v'];
    this.data.forEach(item => {
      const keys: any[] = Object.keys(item);
      keys.forEach(key => {
        if (!excludedKeys.includes(key) && !this.displayedColumns.includes(key)) {
          this.displayedColumns.push(key);
        }
      });
    });
    this.displayedColumns.push('actions');
  }

  editElement(data: any): void {
    // Возвращаем на редоктирование
    this.editItem.emit(data);
  }

  deleteElement(data: any) {
    // Возвращаем на удаление
    this.deleteItem.emit(data);
  }
}
