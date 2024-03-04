import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDetailDto {
  @IsString({
    message: 'La descripcion del producto debe ser un String',
  })
  @IsOptional()
  descripcion: string;

  @IsNumber(
    {},
    {
      message: 'El precio del producto debe ser un Numerico',
    },
  )
  @IsOptional()
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
  @IsOptional()
  impuesto: number;
}
