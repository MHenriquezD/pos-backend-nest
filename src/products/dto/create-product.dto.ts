import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto 1',
  })
  @IsString({
    message: 'El nombre del producto debe ser un texto',
  })
  nombre: string;
}
