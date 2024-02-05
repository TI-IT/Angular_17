import { Component } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {

}
