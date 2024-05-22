import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { SalesService } from '../../services/sales-service.service';
import { Sale } from '../../interfaces/sale.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products-service.service';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export default class SalesComponent implements OnInit{

  public saleForm!: FormGroup
  public salesList = computed(() => this._salesList())
  public productList = computed(() => this._productList())
  public usersList = computed(() => this._userList())
  private _salesService = inject(SalesService)
  private _productService = inject(ProductsService)
  private _usersService = inject(UsersService)
  private _salesList: WritableSignal<Sale []> = signal([])
  private _productList: WritableSignal<Product []> = signal([])
  private _userList: WritableSignal<User []> = signal([])
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.updateSaleList()

    this._productService.getProductsList().subscribe( products => {
      this._productList.set(products)
    })

    this._usersService.getUserList().subscribe( users => {
      this._userList.set(users)
    })

    this.saleForm = this.fb.group({
      id: ['', Validators.required],
      qty: [0, Validators.required],
      sale_at: ['', Validators.required],
      users_id: ['', Validators.required],
      products_id: ['', Validators.required]
    })
  }

  onSubmit() {
    if (!this.saleForm.valid) {
      alert('Llene todos los campos')
      return
    }

    this._salesService.createSale(this.saleForm.value).subscribe({
      next: () => {
        this.updateSaleList()
      }
    })
  }

  updateSaleList() {
    this._salesService.getSalesList().subscribe( sales => {
      this._salesList.set(sales)
    })
  }

}
