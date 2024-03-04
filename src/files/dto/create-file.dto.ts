import { IsString } from 'class-validator';

export class CreateFileDto {
  @IsString({
    message: 'El detalle del producto debe ser una cadena de caracteres',
  })
  id_detalle_producto: string;

  @IsString({
    message: 'El nombre del archivo debe ser una cadena de caracteres',
  })
  nombre: string;

  @IsString({ message: 'La URL del archivo debe ser una cadena de caracteres' })
  url: string;
}
