import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Company } from './entities/company.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('company')
@ApiTags('Compañia')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'La compañia ha sido creada exitosamente',
    type: Company,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la validación de los datos',
  })
  @ApiResponse({
    status: 401,
    description: 'Ya existe una compañia asociada a este usuario',
  })
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: any) {
    return this.companyService.create(createCompanyDto, req.user.correo);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'La compañia ha sido encontrada exitosamente',
    type: Company,
  })
  @ApiResponse({
    status: 404,
    description: 'La compañia no ha sido encontrada',
  })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.companyService.findOne(id, req.user.correo);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'La compañia ha sido actualizada exitosamente',
    type: Company,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la validación de los datos',
  })
  @ApiResponse({
    status: 404,
    description: 'La compañia no ha sido encontrada',
  })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: any,
  ) {
    return this.companyService.update(id, updateCompanyDto, req.user.correo);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'La compañia ha sido eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'La compañia no ha sido encontrada',
  })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.companyService.remove(id, req.user.correo);
  }
}
