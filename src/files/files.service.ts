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

    const secureUrl = `${this._configService.get('HOST_API')}/files/image/${filename}`;
    if (!productDetail)
      throw new BadRequestException('Detalle de producto no encontrado');
    const fileUpload = await this._filesRepo.findOneBy({
      id_detalle_producto: idProductDetail,
    });

    let nombre_completo = 'nopicture.png';
    if (fileUpload) {
      nombre_completo = fileUpload.nombre_completo;
    }
    try {
      let newFile: Files;

      let fileCreated: boolean | Files;
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
        } else {
          const fileUpdated = await this._filesRepo.update(
            {
              id: fileUpload.id,
            },
            {
              nombre: filename.split('.')[0],
              nombre_completo: filename,
              url: secureUrl,
              fecha_modificacion: new Date(),
            },
          );

          if (fileUpdated.affected === 0) {
            throw new BadRequestException(
              'No se ha podido actualizar la imagen',
            );
          }
          fileCreated = fileUpload;
          if (!fileCreated)
            throw new BadRequestException('No se ha podido crear la imagen');
          try {
            // ... code to update the productDetail
            const updatedImage = await this._productDetailRepo.update(
              { id: idProductDetail },
              { imagen: fileCreated.id },
            );

            if (updatedImage.affected === 0)
              try {
                fs.unlink('./public/products/' + filename, (err) => {
                  if (err) console.log(err);
                });
                throw new BadRequestException(
                  'No se ha podido actualizar la imagen',
                );
              } catch (error) {
                this.handleDBErrors(error);
              }
            fs.unlink('./public/products/' + nombre_completo, (err) => {
              if (err) console.log(err);
            });
            const productDetail = await this._productDetailRepo.findOneBy({
              id: idProductDetail,
              creado_por: correo,
            });
            if (!productDetail)
              throw new BadRequestException(
                'Detalle de producto no encontrado',
              );
            const imageCreated = await this._filesRepo.findOneBy({
              id: fileCreated.id,
              id_detalle_producto: idProductDetail,
            });
            return {
              ...productDetail,
              url: imageCreated.url,
            };
          } catch (error) {
            this.handleDBErrors(error);
          }
        }
      } catch (error) {
        this.handleDBErrors(error);
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Error en la base de datos');
  }
}
