import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDetail } from './entities/product-detail.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('product-detail')
@ApiTags('Detalle de productos')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

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
  findOne(@Param('id') id: string) {
    return this.productDetailService.findOne(+id);
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
  ) {
    return this.productDetailService.update(+id, updateProductDetailDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle de producto eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de producto no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(+id);
  }
}
