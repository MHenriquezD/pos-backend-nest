import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    type: String,
    example: 'Juan',
  })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres',
  })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    type: String,
    example: 'Perez',
  })
  @IsString({
    message: 'El apellido debe ser una cadena de caracteres',
  })
  apellido: string;

  @ApiProperty({
    description: 'Correo del cliente',
    type: String,
    example: 'example@gmail.com',
  })
  @IsString({
    message: 'El correo debe ser una cadena de caracteres',
  })
  correo: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    type: String,
    example: '99999999',
  })
  @IsString({
    message: 'El teléfono debe ser una cadena de caracteres',
  })
  telefono: string;

  @ApiProperty({
    description: 'Identidad del cliente',
    type: String,
    example: '0801199900000',
  })
  @IsString({
    message: 'La identidad debe ser una cadena de caracteres',
  })
  identidad: string;
}
