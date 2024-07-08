import { config } from "../config/config";
import { Product } from "../types/product";
import { IProductDB } from "./IProductDB";
import mysql from "mysql2/promise";

export class ProductsSQLDB implements IProductDB {
  private connection!: mysql.Connection;

  async init(): Promise<void> {
    this.connection = await mysql.createConnection({
      host: config.DBAddress,
      password: config.DBPassword,
      user: config.DBUserName,
    });
    await this.connection.query(`
      CREATE DATABASE IF NOT EXISTS Products;
      `);

    await this.connection.query(`
      USE Products;
      `);

    await this.connection.query(`
      CREATE TABLE IF NOT EXISTS Products (
        id int NOT NULL AUTO_INCREMENT,
        barcode BIGINT NOT NULL,
        name varchar(63) NOT NULL,
        image varchar(511) NOT NULL,
        tags varchar(255) NOT NULL,
        rating FLOAT NOT NULL,
        price FLOAT NOT NULL,
        PRIMARY KEY (id)
      );`);
  }

  async getProducts({
    order,
    name,
  }: {
    order?: string;
    name?: string;
  }): Promise<Product[]> {
    const [results, fields] = await this.connection.query(`
      SELECT id, barcode, name, image, tags, rating, price
      FROM Products
      ${name ? `WHERE LOWER(name) LIKE '%${name.toLowerCase()}%'` : ""}
      ${order ? `ORDER BY ${order}` : ""};
      `);

    return (results as any).map(({ tags, ...product }: any) => {
      return { ...product, tags: tags.split("#") };
    });
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    return await this.addProducts([product]);
  }

  async addProducts(products: Omit<Product, "id">[]): Promise<void> {
    const values = products.map((product: Omit<Product, "id">) => {
      return `(
      ${product.barcode}, 
      "${product.name}", 
      "${product.image}", 
      "${product.tags.join("#")}", 
      ${product.rating}, 
      ${product.price})`;
    });
    const query =
      `
INSERT INTO Products
  (barcode, name, image, tags, rating, price)
VALUES
` +
      values.join(",\n") +
      ";";
    await this.connection.query(query);
  }

  async updateProduct(product: Product): Promise<void> {
    await this.connection.query(`
UPDATE Products
SET barcode = ${product.barcode}, 
name = "${product.name}", 
image = "${product.image}", 
tags = "${product.tags.join("#")}", 
rating = ${product.rating}, 
price = ${product.price}
WHERE id = ${product.id};
      `);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.connection.query(`
DELETE FROM Products WHERE id=${id};
      `);
  }
}
