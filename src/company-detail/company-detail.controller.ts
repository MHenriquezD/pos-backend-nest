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
import { CompanyDetailService } from './company-detail.service';
import { CreateCompanyDetailDto } from './dto/create-company-detail.dto';
import { UpdateCompanyDetailDto } from './dto/update-company-detail.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyDetail } from './entities/company-detail.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('company-detail')
@ApiTags('Detalle de la compañia')
export class CompanyDetailController {
  constructor(private readonly companyDetailService: CompanyDetailService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CompanyDetail,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createCompanyDetailDto: CreateCompanyDetailDto,
    @Req() req: any,
  ) {
    return this.companyDetailService.create(
      createCompanyDetailDto,
      req.user.correo,
    );
  }

  // @Get()
  // findAll() {
  //   return this.companyDetailService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companyDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDetailDto: UpdateCompanyDetailDto,
    @Req() req: any,
  ) {
    return this.companyDetailService.update(
      id,
      updateCompanyDetailDto,
      req.user.correo,
    );
  }
}
