import { Module } from '@nestjs/common';
import { CompanyCaiService } from './company-cai.service';
import { CompanyCaiController } from './company-cai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyCai } from './entities/company-cai.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  controllers: [CompanyCaiController],
  providers: [CompanyCaiService],
  imports: [TypeOrmModule.forFeature([CompanyCai, Company])],
})
export class CompanyCaiModule {}
