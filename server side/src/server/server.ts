import express from "express";
import cors from "cors";
import { config } from "../config/config";
import { ProductsService } from "../services/products";
import { logger } from "../common/logger";

export class ProductServer {

  private productService: ProductsService;
  private app;

  constructor({ productService }: { productService: ProductsService }) {
   
    this.productService = productService;
    this.app = express();
    const router = express.Router();

    this.app.use(config.serverPrefix, router);
    router.use(express.json());
    router.use(cors());

    router.get("/products", async (req, res) => {
      const products = await this.productService.getProducts({
        order: req.query.order as string,
        page: +(req.query.page as string),
        name: req.query.name as string
      });
      res.json(products)
    });

    router.put("/product", async (req, res) => {
      const product = req.body;
      await this.productService.addProduct(product);
      res.status(201).send()
    });

    router.post("/product/:id", async (req, res) => {
      const id = req.params.id;
      const product = req.body;
      await this.productService.updateProduct({id, ...product})
      res.status(200).send()
    });

    router.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      await this.productService.deleteProduct(+id);
      res.status(200).send()
    });

    router.get("/health", (req, res) => {
      res.send("ALL GOOD!!!!!")
    });
  }

  start(): void {
    this.app.listen(config.port);
    logger.info(`server is listening on port: ${config.port}`);
  }

}
