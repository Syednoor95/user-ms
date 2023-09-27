import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';
import { ProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  @Post()
  async createProduct(@Body() productData: ProductDto) {
    return await this.productService.createProduct(productData);
  }
}