import { PartialType } from '@nestjs/swagger';
import { CreateCompanyCaiDto } from './create-company-cai.dto';

export class UpdateCompanyCaiDto extends PartialType(CreateCompanyCaiDto) {}
