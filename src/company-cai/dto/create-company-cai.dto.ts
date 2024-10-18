import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCompanyCaiDto {
  @IsUUID('4', { message: 'El id de la empresa debe ser un UUID' })
  id_empresa: string;

  @IsString({ message: 'El CAI debe ser un string' })
  @ApiProperty({
    description: 'Número de CAI',
    example: '6A9ASDF-15SADF-ASD548-ASODF5-ASDF54-AS',
  })
  cai: string;

  @IsNumber({}, { message: 'El correlativo desde debe ser un número' })
  desde: number;

  @IsNumber({}, { message: 'El correlativo hasta debe ser un número' })
  hasta: number;

  @IsString({ message: 'La fecha de inicio debe ser un string' })
  @ApiProperty({
    description: 'Fecha de inicio de vigencia',
    example: Date.now(),
  })
  fecha_inicio: Date;

  @IsString({ message: 'La fecha de fin debe ser un string' })
  @ApiProperty({
    description: 'Fecha de fin de vigencia',
    example: Date.now(),
  })
  fecha_limite: Date;
}
