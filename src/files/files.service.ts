import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { join } from 'path';
import * as fs from 'fs';

import { CreateFileDto } from './dto/create-file.dto';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import { Files } from './entities/file.entity';
import { log } from 'console';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly _filesRepo: Repository<Files>,

    @InjectRepository(ProductDetail)
    private readonly _productDetailRepo: Repository<ProductDetail>,

    private readonly _configService: ConfigService,
  ) {}
  getStatickProductImage(id: string) {
    // ... code to get image from file system
    const path = join(__dirname, '..', '..', 'public', 'products', id);

    if (!path) throw new BadRequestException('La imagen no existe');

    return path;
  }

  async updateProductImage(
    idProductDetail: string,
    filename: string,
    correo: string,
  ) {
    const productDetail = await this._productDetailRepo.findOneBy({
      id: idProductDetail,
    });

    let nombre_completo = '';

    const secureUrl = `${this._configService.get('HOST_API')}/files/image/${filename}`;
    if (!productDetail)
      throw new BadRequestException('Detalle de producto no encontrado');
    const fileUpload = await this._filesRepo.findOneBy({
      id_detalle_producto: idProductDetail,
    });
    if (fileUpload) {
      nombre_completo = fileUpload.nombre_completo;
    }
    try {
      let newFile: Files;

      let fileCreated: Files;
      try {
        // ... code to create a new file
        if (!fileUpload) {
          newFile = this._filesRepo.create({
            id_detalle_producto: idProductDetail,
            nombre: filename.split('.')[0],
            nombre_completo: filename,
            url: secureUrl,
            creado_por: correo,
          });
          fileCreated = await this._filesRepo.save(newFile);
        }

        console.log('Aqui llega');

        let idFile: string;
        let fileUpdated: any;

        if (fileUpload) idFile = fileUpload.id;
        else if (fileCreated) idFile = fileCreated.id;

        fileUpdated = await this._filesRepo.update(
          {
            id: idFile,
          },
          {
            nombre: filename.split('.')[0],
            nombre_completo: filename,
            url: secureUrl,
            fecha_modificacion: new Date(),
          },
        );

        if (fileUpdated.affected === 0) {
          this.deleteImage(filename);
          throw new BadRequestException('No se ha podido actualizar la imagen');
        } else {
          this.deleteImage(nombre_completo);
        }

        if (!fileCreated) fileCreated = fileUpload;
        try {
          // ... code to update the productDetail
          const updatedImage = await this._productDetailRepo.update(
            { id: idProductDetail },
            { imagen: fileCreated.id },
          );

          //if (nombre_completo === '') console.log('No hay imagen aun');

          if (updatedImage.affected === 0) {
            await this._filesRepo.delete({ id: fileCreated.id });
            throw new BadRequestException(
              'No se ha podido actualizar la imagen',
            );
          }

          const productDetail = await this._productDetailRepo.findOneBy({
            id: idProductDetail,
            creado_por: correo,
          });
          if (!productDetail)
            throw new BadRequestException('Detalle de producto no encontrado');
          const imageCreated = await this._filesRepo.findOneBy({
            id: fileCreated.id,
            id_detalle_producto: idProductDetail,
          });
          return {
            ...productDetail,
            url: imageCreated.url,
          };
        } catch (error) {
          this.deleteImage(filename);
          this.handleDBErrors(error);
        }
      } catch (error) {}
    } catch (error) {}
  }

  deleteImage(filename: string) {
    try {
      fs.unlink('./public/products/' + filename, (err) => {
        if (err) console.log('No se ha podido eliminar la imagen');
      });
    } catch (error) {
      console.log('No se ha podido eliminar la imagen');
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Error en la base de datos');
  }
}
