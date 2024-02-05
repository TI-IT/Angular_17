import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-card-products',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCard,
    MatCardModule,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss'
})
export class CardProductsComponent {
  @Input() productsData: any

  constructor() {
  }
}
