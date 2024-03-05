import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDBErrors = (error: any) => {
  if (error.code === '23505') throw new BadRequestException(error.detail);

  console.log(error);

  throw new InternalServerErrorException('Error en la base de datos');
};
