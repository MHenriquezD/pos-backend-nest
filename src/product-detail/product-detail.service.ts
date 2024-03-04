import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from '../products/entities/product.entity';
import { Files } from '../files/entities/file.entity';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetail)
    private _productDetailRepo: Repository<ProductDetail>,

    @InjectRepository(Product)
    private _productRepo: Repository<Product>,

    @InjectRepository(Files)
    private _filesRepo: Repository<Files>,
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

  async findOne(id: string, correo: string) {
    if (!isUUID(id)) throw new BadRequestException('El id no es válido');
    const productDetail = await this._productDetailRepo.findOneBy({
      id,
      creado_por: correo,
    });
    if (!productDetail)
      throw new BadRequestException('Detalle de producto no encontrado');
    const images = await this._filesRepo.findOneBy({ id_detalle_producto: id });
    return { ...productDetail, url: images?.url };
  }

  async update(
    id: string,
    { imagen, ...updateProduct }: UpdateProductDetailDto,
    correo: string,
  ) {
    if (!isUUID(id)) throw new BadRequestException('El id no es UUID válido');
    try {
      const productDetail = await this._productDetailRepo.findOneBy({
        id,
        creado_por: correo,
      });
      if (!productDetail)
        throw new UnauthorizedException(
          'No tienes permiso para modificar este detalle de producto',
        );

      const updatedProductDetail = await this._productDetailRepo.update(
        { id, creado_por: correo },
        updateProduct,
      );
      if (!updatedProductDetail.affected)
        throw new InternalServerErrorException(
          'No se pudo actualizar el producto',
        );

      return await this._productDetailRepo.findOneBy({ id });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Error en la base de datos');
  }
}
