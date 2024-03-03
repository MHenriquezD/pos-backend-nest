import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../helpers/pagination.dto';
import { UpdateProductDetailDto } from '../product-detail/dto/update-product-detail.dto';
import { error } from 'console';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, correo: string) {
    try {
      const product = this._productRepo.create({
        ...createProductDto,
        creado_por: correo,
      });
      return await this._productRepo.save(product);
    } catch (error) {
      this.handleDBErrors(error);
    }
    return 'This action adds a new product, created by: ' + correo;
  }

  async findAll(
    {
      currentPage = 1,
      itemsPerPage = 10,
      search = '',
      childs = false,
    }: PaginationDto,
    user: string,
  ) {
    const query = await this._productRepo
      .createQueryBuilder('product')
      .where(search ? 'product.nombre ILIKE :search' : '1=1', {
        search: `%${search}%`,
      })
      .andWhere('product.creado_por = :user', { user })
      .orderBy('product.fecha_creacion', 'DESC')
      .take(itemsPerPage)
      .skip((currentPage - 1) * itemsPerPage);
    if (childs) {
      query.leftJoinAndSelect('product.productDetails', 'productDetails');
    }
    let productsQuwey = query.getManyAndCount();

    const [products, count] = await productsQuwey;
    const totalPages = Math.ceil(count / +itemsPerPage);

    return {
      products,
      pagination: {
        totalPages,
        currentPage: +currentPage,
        itemsPerPage: +itemsPerPage,
        totalItems: count,
      },
    };
  }

  findOne(id: string, user: string) {
    return this._productRepo.findOneBy({ id, creado_por: user });
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: string) {
    try {
      const productUpdate = await this._productRepo.update(
        { id, creado_por: user },
        { ...UpdateProductDto, fecha_modificacion: new Date() },
      );
      if (productUpdate.affected === 1)
        return this._productRepo.findOneBy({ id });
      return {
        statusCode: 404,
        message: `Producto con id: ${id} no encontrado`,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string, user: string) {
    console.log(id, user);
    try {
      const productUpdate = await this._productRepo.update(
        { id, creado_por: user },
        { visible: false, id, fecha_modificacion: new Date() },
      );
      if (productUpdate.affected === 1) {
        return {
          statusCode: 200,
          message: `Producto eliminado`,
        };
      }
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
