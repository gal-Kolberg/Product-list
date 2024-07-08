import { Product } from "../types/product";

export interface IProductDB {
    init(): Promise<void>

    getProducts({order, name}: {order?: string, name?: string}): Promise<Product[]>

    addProduct(product: Omit<Product, 'id'>): Promise<void>

    addProducts(products: Omit<Product, "id">[]): Promise<void>

    updateProduct(product: Product): Promise<void>

    deleteProduct(id: number): Promise<void>
}