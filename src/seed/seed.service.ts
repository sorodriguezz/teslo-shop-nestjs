import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService,
  ) {

  }
  async runSeed() {
    await this.insertNewProduct();
    return 'SEED EXECUTED';
  }

  private async insertNewProduct(): Promise<boolean> {
    await this.productService.deleteAllProducts();
    return true;
  }

}
