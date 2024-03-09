import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString({
    message: 'El nombre de la empresa debe ser un texto',
  })
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Empresa de ejemplo',
  })
  nombre: string;

  @IsString({
    message: 'La dirección de la empresa debe ser un texto',
  })
  @ApiProperty({
    description: 'Dirección de la empresa',
    example: 'Calle 123',
  })
  direccion: string;

  @IsString({
    message: 'El teléfono de la empresa debe ser un texto',
  })
  @ApiProperty({
    description: 'Teléfono de la empresa',
    example: '1234567890',
  })
  telefono: string;

  @IsString({
    message: 'El correo de la empresa debe ser un texto',
  })
  @ApiProperty({
    description: 'Correo de la empresa',
    example: 'exampleCorreo@example.com',
  })
  correo: string;

  @IsString({
    message: 'El RTN de la empresa debe ser un texto',
  })
  @ApiProperty({
    description: 'RTN de la empresa',
    example: '12345678901234',
  })
  rtn: string;

  @IsInt({
    message: 'El Local debe ser un número entero',
  })
  @ApiProperty({
    description: 'Local de la empresa',
    example: '1',
  })
  local: number;
}
