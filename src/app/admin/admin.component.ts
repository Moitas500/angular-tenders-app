import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface buttonList {
  text: string
  route: string
}

@Component({
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './admin.component.html',
})
export default class AdminComponent {

  public listButtons: buttonList[] = [
    {
      text: 'Ir a productos',
      route: '/admin/products'
    },
    {
      text: 'Ir a ventas',
      route: '/admin/sales'
    },
    {
      text: 'Ir a usuarios',
      route: '/admin/users'
    },
  ]

  private _router = inject(Router)
  
  redirect( route: string ) {
    this._router.navigate([route])
  }

}
