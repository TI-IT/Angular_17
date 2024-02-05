import { Component } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.scss'
})
export class SupplyComponent {

}
