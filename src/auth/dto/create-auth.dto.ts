import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: '1234567890123',
    description: 'Identidad del usuario',
    required: true,
  })
  @IsString({
    message: 'La identidad debe ser un string',
  })
  identidad: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario',
    required: true,
  })
  @IsString({
    message: 'El nombre debe ser un string',
  })
  contrasena: string;
}
