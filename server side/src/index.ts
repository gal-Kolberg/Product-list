import { IProductDB } from "./DB/IProductDB";
import { ProductsSQLDB } from "./DB/mySQL";
import { ProductServer } from "./server/server";
import { ProductsService } from "./services/products";

const start = async() => {
  // create dependencies
  const db: IProductDB = new ProductsSQLDB();
  await db.init()

  const productService: ProductsService = new ProductsService({db});
  await productService.init();

  const server: ProductServer = new ProductServer({productService});
  
  // start app
  server.start();
  
};

start();