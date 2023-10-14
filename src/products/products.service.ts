import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private product: Array<Product> = [];

  createProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(new Date().toString(), title, desc, price);
    this.product.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return [...this.product];
  }
}
