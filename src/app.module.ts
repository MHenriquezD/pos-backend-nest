import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ClientsModule } from './clients/clients.module';
import { CompanyModule } from './company/company.module';
import { CompanyDetailModule } from './company-detail/company-detail.module';
import { CompanyCaiModule } from './company-cai/company-cai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    ProductDetailModule,
    AuthModule,
    UsersModule,
    FilesModule,
    ClientsModule,
    CompanyModule,
    CompanyDetailModule,
    CompanyCaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
