import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    type: String,
    example: 'Juan',
  })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres',
  })
  @IsOptional()
  nombre: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    type: String,
    example: 'Perez',
  })
  @IsString({
    message: 'El apellido debe ser una cadena de caracteres',
  })
  @IsOptional()
  apellido: string;

  @ApiProperty({
    description: 'Correo del cliente',
    type: String,
    example: 'example@gmail.com',
  })
  @IsString({
    message: 'El correo debe ser una cadena de caracteres',
  })
  @IsOptional()
  correo: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    type: String,
    example: '99999999',
  })
  @IsString({
    message: 'El teléfono debe ser una cadena de caracteres',
  })
  @IsOptional()
  telefono: string;
}
