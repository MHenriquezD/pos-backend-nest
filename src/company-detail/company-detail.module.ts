import { Module } from '@nestjs/common';
import { CompanyDetailService } from './company-detail.service';
import { CompanyDetailController } from './company-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDetail } from './entities/company-detail.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  controllers: [CompanyDetailController],
  providers: [CompanyDetailService],
  imports: [TypeOrmModule.forFeature([CompanyDetail, Company])],
})
export class CompanyDetailModule {}
