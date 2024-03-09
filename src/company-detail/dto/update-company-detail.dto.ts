import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDetailDto } from './create-company-detail.dto';

export class UpdateCompanyDetailDto extends PartialType(CreateCompanyDetailDto) {}
