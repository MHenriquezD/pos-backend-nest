import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateCompanyDetailDto } from './dto/update-company-detail.dto';
import { CreateCompanyDetailDto } from './dto/create-company-detail.dto';
import { CompanyDetail } from './entities/company-detail.entity';
import { Company } from '../company/entities/company.entity';
import { handleDBErrors } from 'src/helpers/error.helper';

@Injectable()
export class CompanyDetailService {
  constructor(
    @InjectRepository(CompanyDetail)
    private readonly _companyDetailRepo: Repository<CompanyDetail>,

    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyDetailDto: CreateCompanyDetailDto, correo: string) {
    try {
      const Company: Company = await this._companyRepo.findOne({
        where: {
          id: createCompanyDetailDto.id_empresa,
          borrado: false,
          creado_por: correo,
        },
      });
      if (!Company) {
        throw new BadRequestException('La empresa no existe');
      }
      const companyDetail: CompanyDetail =
        await this._companyDetailRepo.findOne({
          where: {
            id_empresa: createCompanyDetailDto.id_empresa,
          },
        });
      if (companyDetail) {
        throw new BadRequestException(
          'Ya existe un detalle asociado a esta empresa',
        );
      }
      return await this._companyDetailRepo.save({
        ...createCompanyDetailDto,
        creado_por: correo,
        fecha_creacion: new Date(),
      });
    } catch (error) {
      handleDBErrors(error);
    }
    return 'This action adds a new companyDetail';
  }

  findAll() {
    return `This action returns all companyDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyDetail`;
  }

  async update(
    id: string,
    updateCompanyDetailDto: UpdateCompanyDetailDto,
    correo: string,
  ) {
    try {
      const companyDetail: CompanyDetail =
        await this._companyDetailRepo.findOne({
          where: {
            id_empresa: updateCompanyDetailDto.id_empresa,
            creado_por: correo,
          },
        });
      if (!companyDetail) throw new BadRequestException('El detalle no existe');

      Object.assign(companyDetail, {
        ...updateCompanyDetailDto,
        modificado_por: correo,
        fecha_modificado: new Date(),
      });
      return await this._companyDetailRepo.save(companyDetail);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
