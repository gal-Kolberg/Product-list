import { httpClient } from "../common/httpClient";
import { logger } from "../common/logger";
import { config } from "../config/config";
import { IProductDB } from "../DB/IProductDB";
import { FullProduct } from "../types/fullProduct";
import { Product } from "../types/product";

export class ProductsService {
  private db: IProductDB;

  constructor({ db }: { db: IProductDB }) {
    this.db = db;
  }

  async init(): Promise<void> {
    const products = await this.getProducts();

    if (products.length > 0) {
      return;
    }

    const defaultProducts = await this.getDefaultProducts();
    this.db.addProducts(defaultProducts);
  }

  async getDefaultProducts(): Promise<Omit<Product, "id">[]> {
    const result = await httpClient.get(config.APIAddress);
    logger.info("Default products were fetched successfully");
    return result.data.products.map((fullProduct: FullProduct) => {
      return {
        barcode: fullProduct.meta.barcode,
        name: fullProduct.title,
        image: fullProduct.images[0],
        tags: fullProduct.tags,
        rating: fullProduct.rating,
        price: fullProduct.price,
      };
    });
  }

  async getProducts({
    order,
    page,
    name
  }: { order?: string; page?: number; name?: string } = {}): Promise<Product[]> {
    const products = await this.db.getProducts({ order, name });
    logger.info("Products were fetched successfully");

    if (page === undefined || isNaN(page)) {
      return products;
    }

    return products.slice(
      config.NumberOfProductsPerPage * page,
      Math.min(config.NumberOfProductsPerPage * (page + 1), products.length)
    );
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    await this.db.addProduct(product);
    logger.info("Product added successfully");
  }

  async updateProduct(product: Product): Promise<void> {
    await this.db.updateProduct(product);
    logger.info("Product updated successfully");
  }

  async deleteProduct(id: number): Promise<void> {
    await this.db.deleteProduct(id);
    logger.info("Product deleted successfully");
  }
}
