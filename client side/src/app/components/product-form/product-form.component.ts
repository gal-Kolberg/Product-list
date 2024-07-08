import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product = { id: 0, barcode: 0, name: '', image: '', tags: [], rating: 0, price: 0 };
  @Output() formClosed = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.product.id) {
      this.productService.updateProduct(this.product).subscribe(() => this.formClosed.emit());
    } else {
      this.productService.addProduct(this.product).subscribe(() => this.formClosed.emit());
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }
}
