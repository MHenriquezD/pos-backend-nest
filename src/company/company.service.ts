import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { handleDBErrors } from '../helpers/error.helper';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, correo: string) {
    try {
      const company = await this._companyRepo.findOne({
        where: { creado_por: correo, borrado: false },
      });
      if (company)
        throw new UnauthorizedException(
          'Ya existe una empresa asociada a este usuario',
        );
      return await this._companyRepo.save({
        ...createCompanyDto,
        creado_por: correo,
      });
    } catch (error) {
      handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  async findOne(id: string, correo: string) {
    try {
      return await this._companyRepo.findOne({
        where: { id, creado_por: correo },
      });
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, correo: string) {
    try {
      const company: Company = await this._companyRepo.findOne({
        where: { id, creado_por: correo, borrado: false },
      });
      if (!company)
        throw new BadRequestException(
          'No tienes permisos para realizar esta acción',
        );

      Object.assign(company, {
        ...updateCompanyDto,
        modificado_por: correo,
        fecha_modificado: new Date(),
      });
      return await this._companyRepo.save(company);
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async remove(id: string, correo: string) {
    try {
      const company: Company = await this._companyRepo.findOne({
        where: { id, creado_por: correo },
      });
      if (!company)
        throw new UnauthorizedException(
          'No tienes permisos para realizar esta acción',
        );
      Object.assign(company, {
        eliminado_por: correo,
        borrado: true,
        fecha_eliminacion: new Date(),
      });
      return await this._companyRepo.save(company);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
