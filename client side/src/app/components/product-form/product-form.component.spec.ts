import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [ProductService],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should add product', () => {
    const mockProduct = { id: 0, barcode: 123, name: 'New Product', image: '', tags: [], rating: 5, price: 100 };
    spyOn(productService, 'addProduct').and.returnValue(of(mockProduct));

    component.product = mockProduct;
    component.onSubmit();

    expect(productService.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should update product', () => {
    const mockProduct = { id: 1, barcode: 123, name: 'Updated Product', image: '', tags: [], rating: 5, price: 100 };
    spyOn(productService, 'updateProduct').and.returnValue(of(mockProduct));

    component.product = mockProduct;
    component.onSubmit();

    expect(productService.updateProduct).toHaveBeenCalledWith(mockProduct);
  });
});
