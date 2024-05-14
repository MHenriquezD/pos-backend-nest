import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDBErrors = (error: any) => {
  if (error.code === '23505') throw new BadRequestException(error.detail);
  if ((error.message = 'Bad Request' && error.response))
    throw new BadRequestException(error.response);

  console.log(error);

  throw new InternalServerErrorException('Error en la base de datos');
};
