import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: '1234567890123',
    description: 'Identidad del usuario',
    required: true,
  })
  @IsString({
    message: 'La identidad debe ser un string',
  })
  @IsOptional()
  identidad: string;

  @ApiProperty({
    example: 'mhenriquez@gmail.com',
    description: 'Correo del usuario',
    required: true,
  })
  @IsString({
    message: 'El correo debe ser un string',
  })
  @IsOptional()
  correo: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario',
    required: true,
  })
  @IsString({
    message: 'La contraseña debe ser un string',
  })
  @MinLength(6)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número o un caracter especial',
  })
  contrasena: string;
}
