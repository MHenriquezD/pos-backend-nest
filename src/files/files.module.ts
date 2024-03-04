import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/file.entity';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
  imports: [TypeOrmModule.forFeature([Files, ProductDetail])],
})
export class FilesModule {}
