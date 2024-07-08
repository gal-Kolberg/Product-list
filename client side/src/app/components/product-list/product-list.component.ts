import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  search = '';
  order = '';
  page = 0;

  @Output() addProduct = new EventEmitter<void>();
  @Output() editProduct = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.search, this.page, this.order).subscribe(products => {
      this.products = products;
    });
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.search = inputElement.value;
    this.page = 0;
    this.loadProducts();
  }

  onOrderChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.order = selectElement.value;
    this.page = 0;
    this.loadProducts();
  }

  onPageChange(pageValue: number): void {
    this.page = pageValue;
    this.loadProducts();
  }

  onAddProduct(): void {
    this.addProduct.emit();
  }

  onEditProduct(product: Product): void {
    this.editProduct.emit(product);
  }

  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
