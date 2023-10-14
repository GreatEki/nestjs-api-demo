import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private product: Array<Product> = [];

  createProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(
      Math.ceil(Math.random() * 100).toString(),
      title,
      desc,
      price,
    );
    this.product.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return [...this.product];
  }

  getProduct(id: string) {
    const product = this.product.find((prod) => prod.id === id);

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
