import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {IRole} from "../../../../typeScript/interfaces";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiClientsService} from "../../../../services/api/api-clients.service";
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {GlobalSnackBarService} from "../../../../services/global-snack-bar.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {DropDownListComponent} from "../../components/drop-down-list/drop-down-list.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatIcon,
    MatInput,
    DropDownListComponent,
    MatDialogClose,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  @ViewChild('input4') input4!: ElementRef;
  empForm!: FormGroup
  role_id!: IRole[]
  newRole_id!: IRole[]
  allRole!: IRole[]

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiClientsService,
    private _dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBarService: GlobalSnackBarService,
  ) {
  }

  ngOnInit(): void {
    if (!this.allRole) {
      this.getAllRole()
    }
    if (this.data.role_id.length > 0) {
      this.role_id = this.data.role_id
    } else {
      this.role_id = [{roleName: 'поле пустое', _id: '0'}];
    }
    this.createEmpForm()
    if (this.data) {
      // this.selectedRoleIds = this.data.role_id.map((role: IRole) => role._id);
      this.empForm.patchValue(this.data)
    }
    // Существующие роли
    this.newRole_id = this.role_id;

  }

  createEmpForm() {
    this.empForm = this._fb.group({
      name: [null],
      email: [null, Validators.required],
      role_id: [null]
    })
  }

  getAllRole() {
    this._apiService.getAll('roles').subscribe((data) => {
      this.allRole = []
      const allRoleArray: IRole[] = data.data
      if (allRoleArray) {
        allRoleArray.forEach(role => {
            this.allRole.push(role)
          }
        )
      }
    })
  }

  addRole(){
    this.role_id.push({roleName: 'поле пустое', _id: '0'});
  }

  rolesSelected(data: any) {
    // Выбранный новый роли id
    const selectedId = data.event.selectedId;

    // Название старой роли, которую мы заменяем
    const selectedName = data.event.selectedName;

    // Список всех возможных ролей
    const allRoles = this.allRole;

    // Найти выбранную роль в базе данных
    const selectedRole = allRoles.find(obj => obj._id === selectedId);

    // Если selectedRole не существует, просто остаемся с текущими ролями
    if (!selectedRole) return;

    // Если массив newRole_id не существует, создаем его и добавляем выбранную роль
    if (!this.newRole_id) {
      this.newRole_id = [selectedRole];
    } else {
      // Отфильтровываем роли, название которых совпадает с выбранной для удаления

      this.newRole_id = this.newRole_id.filter(role => role.roleName !== selectedName);

      // Проверяем, существует ли уже роль с таким же ID, как у selectedRole
      const roleExists = this.newRole_id.some(role => role._id === selectedRole._id);

      // Если роли с таким ID не существует, добавляем выбранную роль
      if (!roleExists) {
        this.newRole_id.push(selectedRole);
      }


      this.role_id = this.newRole_id
      // Если вдруг нужно удалить дубликаты по _id (что было в вашем изначальном коде),
      // то ниже приведен код для удаления дубликатов
      // Удаление дубликатов после замены
      // const uniqueRoles = new Map(this.newRole_id.map(role => [role._id, role]));
      // this.newRole_id = Array.from(uniqueRoles.values());
    }

    console.log(this.newRole_id);
  }



  resetData(): void {
    this.empForm.reset();
    this.newRole_id = this.role_id;
  }

  updateFormDataAndRoles(updatedData: any) {
    // Обновите информацию в форме
    this.empForm.patchValue(updatedData);

    // Обновите роли, если они были изменены
    if (updatedData.roles) {
      this.role_id = updatedData.roles;
    }
  }

  onFormSubmit() {
    // console.log(this.newRole_id)

    const role_id = this.role_id?.map(item => item._id);
    const newRole_id = this.newRole_id?.map(item => item._id);
    const payload = {
      ...this.empForm.value,
      role_id: newRole_id ? newRole_id : role_id
    };

    // console.log('payload', payload)
    // console.log(this.empForm.valid)
    if (this.empForm.valid) {
      if (this.data) {
        this._apiService
          .update(this.data._id, 'users', payload)
          .subscribe({
            next: (val) => {
              this._snackBarService.openSnackBar('Обновление прошло успешно').afterDismissed().subscribe(() => {
                // После закрытия СнэкБара обновите данные
                this.updateFormDataAndRoles(val);
              });

              this._dialogRef.close(val);
              // Перенесённый вызов resetData - внутрь afterDismissed
              this.resetData();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        // Обработка добавления нового пользователя
        // ....
      }
    }
  }
}

// как перерисовать templateUrl: './user-detail.component.html', после this._snackBarService.openSnackBar('Обновление прошло успешно')
