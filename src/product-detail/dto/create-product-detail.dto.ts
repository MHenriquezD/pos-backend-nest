import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @IsString({
    message: 'El id del producto debe ser un String',
  })
  id_producto: string;

  @IsString({
    message: 'La descripcion del producto debe ser un String',
  })
  descripcion: string;

  @IsNumber(
    {},
    {
      message: 'El precio del producto debe ser un Numerico',
    },
  )
  precio: number;

  @IsString({
    message: 'La imagen del producto debe ser un String',
  })
  @IsOptional()
  imagen: string;

  @IsNumber(
    {},
    {
      message: 'El impuesto del producto debe ser un Numerico',
    },
  )
  impuesto: number;
}
