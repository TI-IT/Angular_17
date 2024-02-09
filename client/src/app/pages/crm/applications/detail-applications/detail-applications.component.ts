import {Component, OnInit} from '@angular/core';
import {ICreateApplications} from "../../../../typeScript/interfaces";
import {ClientsService} from "../../../../services/clients.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApplicationsService} from "../../../../services/applications.service";
import {GlobalFunctionsService} from "../../../../services/global-functions.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {DetailOrderComponent} from "../../order/detail-order/detail-order.component";

@Component({
  selector: 'app-detail-applications',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatCard,
    MatCardAvatar,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    RouterLink,
    MatCardActions,
    MatButton
  ],
  templateUrl: './detail-applications.component.html',
  styleUrl: './detail-applications.component.scss'
})
export class DetailApplicationsComponent implements OnInit {
  _id!: string
  applicationDetails!: ICreateApplications
  viewFormatPhone!: string
  createFormatPhone = this._global.createFormatPhone
  applicationsFormatView = this._applicationsService.applicationsFormatView
  formatNumberPhoneClientsList = this._appClientsService.formatNumberPhoneClientsList

  productOrders: any = {
    materials: [
      {
        position: 1,
        name: 'Услуга или товар 1',
        quantity: 3,
        unit: 'шт.',
        price: 15000 + ',' + '00',
        total: 28000 + ',' + '00'
      },
      {
        position: 2,
        name: 'Услуга или товар 2',
        quantity: 1,
        unit: 'шт.',
        price: 9000 + ',' + '00',
        total: 9000 + ',' + '00'
      },
      {
        position: 3,
        name: 'Услуга или товар 2 (Скидка 10%)',
        quantity: 1,
        unit: 'шт.',
        price: -900 + ',' + '00',
        total: -900 + ',' + '00'
      }
    ],
    works: [
      {
        position: 1,
        name: 'Услуга или товар 1',
        quantity: 3,
        unit: 'шт.',
        price: 15000 + ',' + '00',
        total: 28000 + ',' + '00'
      },
      {
        position: 2,
        name: 'Услуга или товар 2',
        quantity: 1,
        unit: 'шт.',
        price: 9000 + ',' + '00',
        total: 9000 + ',' + '00'
      },
    ],
    services: [
      {position: 1, name: 'Доставка', quantity: 1, unit: 'шт.', price: 1500 + ',' + '00', total: 1500 + ',' + '00'},
    ]
  }

  constructor(
    private _appClientsService: ClientsService,
    private activateRoute: ActivatedRoute,
    private _applicationsService: ApplicationsService,
    private _global: GlobalFunctionsService,
    private _snackBar: SnackBarService,
    public dialog: MatDialog,
  ) {
    this._id = activateRoute.snapshot.params['id']
  }

  ngOnInit() {
    //Получаем заявки для отображения на странице заявок
    if (this.formatNumberPhoneClientsList().length === 0) {
      this._appClientsService.getClientsList()
    }
    this.applicationsFormatView()?.map(obj => {
      if (this._id === obj._id) {
        this.applicationDetails = obj
        this.viewFormatPhone = this.createFormatPhone(obj.numberPhone)
      }
    })
  }

  onEditItem() {
    console.log('onEditItem() {')
    const dialogRef = this.dialog.open(DetailOrderComponent, {
      width: 'auto',
      height: 'auto',
      data: this.productOrders
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Диалоговое окно закрыто');
      // Если результат есть и значение success равно true, тогда обновляем данные
      if (result && result.success) {
        // this.loadUserData();
      }
    });
    // Обработайте отредактированный элемент здесь
    // filteredUpdatedItem содержит обновленные данные после редактирования
  }
}
