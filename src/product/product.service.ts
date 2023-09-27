import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../model/product.model';
import { ProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  // Simulated database (you should replace this with a real database)
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productData: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductById(productId: string): Promise<Product | undefined> {
    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }
}
