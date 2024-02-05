import {Component, OnInit} from '@angular/core';
import {IClients} from "../../../../typeScript/interfaces";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApplicationsService} from "../../../../services/applications.service";
import {ClientsService} from "../../../../services/clients.service";
import {ApiClientsService} from "../../../../services/api/api-clients.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardModule,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatButton,
    RouterLink,
    MatCardActions
  ],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent implements OnInit {
  clientId!: any
  _id!: string
  clientsDetails!: IClients
  applicationsClientsDetails!: any
  viewFormatPhone!: string
  formatNumberPhoneClientsList = this._appService.formatNumberPhoneClientsList
  applicationsFormatView = this._applicationsService.applicationsFormatView

  constructor(
    private activateRoute: ActivatedRoute,
    private _applicationsService: ApplicationsService,
    private _appService: ClientsService,
    private route: ActivatedRoute,
    private _apiService: ApiClientsService
  ) {
    this._id = activateRoute.snapshot.params['id']
  }

  ngOnInit() {
    //Получаем заявки для отображения на странице заявок
    if(this.applicationsFormatView().length === 0){
      this._applicationsService.getApplicationsList()
    }
    // получаем значение параметра client_id из URL
    this.clientId = this.route.snapshot.paramMap.get('id');
    //Получаем клиента по ID из списка
    this.formatNumberPhoneClientsList()?.map(obj => {
      if (this.clientId === obj._id) {
        this.clientsDetails = obj
        this.getApplicationsClient(obj._id) // Вызовите getApplicationsClient только один раз
      }
    })
  }

  getApplicationsClient(id: string | undefined) {
    this._apiService.getAllById('applications/clientsId', {id})
      .subscribe(data => {
        if(data) {
          this.applicationsClientsDetails = data
        }
      })
  }
}
