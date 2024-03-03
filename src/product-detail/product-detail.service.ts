import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';
import { Repository } from 'typeorm';
import { IsUUID } from 'class-validator';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetail)
    private _productDetailRepo: Repository<ProductDetail>,
  ) {}
  create(createProductDetailDto: CreateProductDetailDto, correo: string) {
    try {
      // ... code to create a productDetail
      const productDetail = this._productDetailRepo.create({
        ...createProductDetailDto,
        creado_por: correo,
      });
      return this._productDetailRepo.save(productDetail);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    return await this._productDetailRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    return `This action updates a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Error en la base de datos');
  }
}
