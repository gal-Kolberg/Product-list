import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Product } from './shared/models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet, 
    ProductListComponent, 
    ProductFormComponent,
    CommonModule
  ],
  providers: [ProductService],
})
export class AppComponent {
  showForm = false;
  selectedProduct: Product = this.getEmptyProduct();

  onAddProduct(): void {
    this.selectedProduct = this.getEmptyProduct();
    this.showForm = true;
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = product;
    this.showForm = true;
  }

  onCloseForm(): void {
    this.showForm = false;
  }

  private getEmptyProduct(): Product {
    return { id: 0, barcode: 0, name: '', image: '', tags: [], rating: 0, price: 0 };
  }
}
