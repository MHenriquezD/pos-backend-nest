import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { fileFilter, fileNamer } from '../helpers/files/index';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@UseGuards(AuthGuard('jwt'))
@Controller('product-detail')
@ApiTags('Detalle de productos')
export class ProductDetailController {
  constructor(
    private readonly productDetailService: ProductDetailService,
    private readonly _configService: ConfigService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'El detalle del producto ha sido creado',
    type: ProductDetail,
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  create(
    @Body() createProductDetailDto: CreateProductDetailDto,
    @Req() req: any,
  ) {
    return this.productDetailService.create(
      createProductDetailDto,
      req.user.correo,
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de detalles de productos',
    type: [ProductDetail],
  })
  @ApiResponse({
    status: 404,
    description: 'No hay detalles de productos',
  })
  findAll() {
    return this.productDetailService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle de producto encontrado',
    type: ProductDetail,
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de producto no encontrado',
  })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.productDetailService.findOne(id, req.user.correo);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'El detalle del producto ha sido actualizado',
    type: ProductDetail,
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de producto no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
    @Req() req: any,
  ) {
    return this.productDetailService.update(
      id,
      updateProductDetailDto,
      req.user.correo,
    );
  }
}
