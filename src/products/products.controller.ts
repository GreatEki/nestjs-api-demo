import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ): Product {
    const result = this.productsService.createProduct(title, desc, price);
    return result;
  }
}
