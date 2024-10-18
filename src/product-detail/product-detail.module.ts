import { Module } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductDetail } from './entities/product-detail.entity';
import { Product } from '../products/entities/product.entity';
import { ConfigService } from '@nestjs/config';
import { Files } from '../files/entities/file.entity';

@Module({
  controllers: [ProductDetailController],
  providers: [ProductDetailService, ConfigService],
  imports: [TypeOrmModule.forFeature([ProductDetail, Product, Files])],
})
export class ProductDetailModule {}
