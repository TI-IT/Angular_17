import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../../../typeScript/interfaces";
import {Subscription} from "rxjs";
import {ApiAdminService} from "../../admin/api-admin.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {GlobalFunctionsService} from "../../../../services/global-functions.service";
import {UserDetailComponent} from "../user-detail/user-detail.component";
import {TableCrudComponent} from "../../components/table-crud/table-crud.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    TableCrudComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {
  aSub!: Subscription;
  users!: IUser[];
  viewUsers!: any[];

  constructor(
    private api: ApiAdminService,
    private _snackBar: SnackBarService,
    public dialog: MatDialog,
    private _global: GlobalFunctionsService,
  ) {
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.aSub = this.api.getAll('users').subscribe({
      next: ({message, data}) => {
        this._snackBar.openTop(message);
        this.users = data
        // Проверяем, что data является массивом объектов IUser
        if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
          // Копируем пользователей, исключая role_id
          this.viewUsers = data.map(user => {
            const {role_id, ...userWithoutRoleId} = user as IUser;
            return userWithoutRoleId;
          });
        } else {
          console.error('Данные не являются массивом объектов');
        }
      },
      error: (error) => {
        this._snackBar.openTop(error.error.message);
      },
    });
  }


//Полученные данные от CRUD-TABLE
  onEditItem(updatedItem: any) {
    // Находим пользователя в массиве users по _id
    const userToUpdate = this.users.find(user => user._id === updatedItem._id);
    // Фильтруем ключи, которые не нужно отправлять в редактирование
    const excludedKeys = ['password', '__v'];
    // Вызываем функцию для фильтрации ключей
    const filteredUpdatedItem = this._global.filterKeys(userToUpdate, excludedKeys);
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: 'auto',
      height: 'auto',
      data: { ...filteredUpdatedItem }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Диалоговое окно закрыто');
      this.loadUserData();
      // Если результат есть и значение success равно true, тогда обновляем данные
      // if (result && result.success) {
      //   console.log(result, result.success);
      //   this.loadUserData();
      // }
    });
    // Обработайте отредактированный элемент здесь
    // filteredUpdatedItem содержит обновленные данные после редактирования
  }

  onDeleteItem(deletedItem: any) {
    // Обработайте удаленный элемент здесь
    // deletedItem содержит данные удаленного элемента
    console.log('Deleted item:', deletedItem);
  }

  ngOnDestroy(): void {
    // Отписываемся от стрима
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
