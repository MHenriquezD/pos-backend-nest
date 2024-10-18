import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from '../helpers/files/index';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('files')
@ApiTags('Archivos')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly _configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':idProductDetail/image')
  @ApiResponse({
    status: 200,
    description: 'La imagen del detalle del producto ha sido actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de producto no encontrado',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 1024 * 1024 },
      storage: diskStorage({
        destination: './public/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('idProductDetail') idProductDetail: string,
    @Req() req: any,
  ) {
    if (!file || file === undefined || file === null)
      throw new BadRequestException('No se ha enviado un archivo');

    return this.filesService.updateProductImage(
      idProductDetail,
      file.filename,
      req.user.correo,
    );
  }

  @Get('image/:imageName')
  @ApiResponse({
    status: 200,
    description: 'Imagen encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada',
  })
  findImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const path = this.filesService.getStatickProductImage(imageName);

    res.sendFile(path);
  }
}
