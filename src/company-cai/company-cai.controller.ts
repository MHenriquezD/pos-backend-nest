import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyCaiService } from './company-cai.service';
import { CreateCompanyCaiDto } from './dto/create-company-cai.dto';
import { UpdateCompanyCaiDto } from './dto/update-company-cai.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Cai de la compañia')
@Controller('company-cai')
export class CompanyCaiController {
  constructor(private readonly companyCaiService: CompanyCaiService) {}

  @Post()
  create(@Body() createCompanyCaiDto: CreateCompanyCaiDto, @Req() req: any) {
    return this.companyCaiService.create(createCompanyCaiDto, req.user.correo);
  }
}
