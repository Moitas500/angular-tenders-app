import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment.local';
import { HeaderService } from '../../shared/services/header.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private _httpClient = inject(HttpClient)
  private _headers = inject(HeaderService)
  private _baseUrl = environment.serviceHost
  
  getUserList() {
    return this._httpClient.get<User []>(`${this._baseUrl}/users`, {
      headers: this._headers.getHeaders()
    })
  }

  createUser(user: User) {
    return this._httpClient.post(`${this._baseUrl}/users/create-user`, user, {
      headers: this._headers.getHeaders()
    })
  }

  updateUser(id: string, roles_id: string) {
    const payload = {
      id: id,
      roles_id: roles_id
    }

    return this._httpClient.put(`${this._baseUrl}/users/update-user`, payload, {
      headers: this._headers.getHeaders()
    })
  }
}
