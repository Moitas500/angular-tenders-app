import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { environment } from '../../../environment/environment.local';
import { Sale } from '../interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private _http = inject(HttpClient)
  private _headers = inject(HeaderService)
  private _baseUrl = environment.serviceHost

  getSalesList() {
    return this._http.get<Sale []>(`${this._baseUrl}/sales`, {
      headers: this._headers.getHeaders()
    })
  }
  
  createSale(sale: Sale) {
    return this._http.post(`${this._baseUrl}/sales/create-sale`, sale, {
      headers: this._headers.getHeaders()
    })
  }
}
