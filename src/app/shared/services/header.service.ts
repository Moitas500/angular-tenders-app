import { Injectable, computed } from '@angular/core';
import { environment } from '../../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private readonly _headers = computed( () => ({
    auth: environment.role_user
  }))
  
  getHeaders() {
    return this._headers()
  }
}
