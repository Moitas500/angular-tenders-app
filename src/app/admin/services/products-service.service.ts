import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { environment } from '../../../environment/environment.local';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _http = inject(HttpClient)
  private _headers = inject(HeaderService)
  private _baseUrl = environment.serviceHost

  getProductsList() {
    return this._http.get<Product []>(`${this._baseUrl}/products`, {
      headers: this._headers.getHeaders()
    })
  }

  createProduct(product: Product) {
    return this._http.post(`${this._baseUrl}/products/create-product`, product, {
      headers: this._headers.getHeaders()
    })
  }

}
