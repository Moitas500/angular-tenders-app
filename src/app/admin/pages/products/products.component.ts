import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {

  private _productsService = inject(ProductsService)

}
