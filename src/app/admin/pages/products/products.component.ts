import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service.service';
import { Product } from '../../interfaces/product.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent implements OnInit{

  public productForm!: FormGroup
  public products = computed(() => this._products())
  private _productsService = inject(ProductsService)
  private _products: WritableSignal<Product []> = signal([])
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.updateProductList()

    this.productForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required]
    })
  }

  onSubmit() {
    if ( !this.productForm.valid ) {
      alert('Rellene todos los campos')
      return
    }

    this._productsService.createProduct(this.productForm.value).subscribe({
      next: () => {
        this.updateProductList()
      }
    })
  }

  updateProductList() {
    this._productsService.getProductsList().subscribe( products => {
      this._products.set(products)
     })
  }

}
