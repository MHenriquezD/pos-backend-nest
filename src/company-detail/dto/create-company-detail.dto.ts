import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDetailDto {
  @IsUUID('4', { message: 'El campo id_empresa debe ser de tipo UUID' })
  id_empresa: string;

  @IsNumber({}, { message: 'El campo correlativo debe ser de tipo number' })
  correlativo: number;
}
