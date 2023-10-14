import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];

  createProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(
      Math.ceil(Math.random() * 100).toString(),
      title,
      desc,
      price,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const [product] = this.findProduct(id);
    return product;
  }

  updateProduct(
    productId: string,
    body: { title: string; desc: string; price: number },
  ) {
    const [product, index] = this.findProduct(productId);
    this.products[index] = {
      ...product,
      title: body.title || product.title,
      desc: body.desc || product.title,
      price: body.price || product.price,
    };
    return this.products[index];
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('No product found for record id');

    return [product, productIndex];
  }
}
