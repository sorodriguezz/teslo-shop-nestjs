import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed(): Promise<string> {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProduct(adminUser);
    return 'SEED EXECUTED';
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0]; // se envio para ocupar en runSeed e insertar los productos como admin
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewProduct(user: User): Promise<boolean> {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
