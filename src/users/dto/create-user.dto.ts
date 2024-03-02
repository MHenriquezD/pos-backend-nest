import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '1234567890123',
    description: 'Identidad del usuario',
    required: true,
  })
  @IsString({ message: 'La identidad debe ser un string' })
  identidad: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    required: true,
  })
  @IsString({ message: 'El nombre debe ser un string' })
  nombre: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario',
    required: true,
  })
  @IsString({ message: 'El apellido debe ser un string' })
  apellido: string;

  @ApiProperty({
    example: 'usuario.usuario@gmail.com',
    description: 'Correo del usuario',
    required: true,
  })
  @IsString({ message: 'El correo debe ser un string' })
  correo: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario',
    required: true,
  })
  @IsString({ message: 'La contraseña debe ser un string' })
  contrasena: string;
}
