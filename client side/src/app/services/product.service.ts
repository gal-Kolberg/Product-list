import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { config } from '../shared/config/config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${config.urlPrefix}:${config.port}${config.serverPrefix}`;

  constructor(private http: HttpClient) {}

  getProducts(
    search?: string,
    page?: number,
    order: string = 'id'
  ): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('order', order);

    if (search) {
      params = params.append('name', search);
    }
    if (page) {
      params = params.append('page', page.toString());
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/product`, {
      ...product,
      tags: (product.tags as any).split(','),
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/product/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${id}`);
  }
}
