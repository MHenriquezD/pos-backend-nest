import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyCaiDto } from './dto/create-company-cai.dto';
import { UpdateCompanyCaiDto } from './dto/update-company-cai.dto';
import { handleDBErrors } from '../helpers/error.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyCai } from './entities/company-cai.entity';
import { In, LessThan, Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class CompanyCaiService {
  constructor(
    @InjectRepository(CompanyCai)
    private readonly _companyCaiRepo: Repository<CompanyCai>,

    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
  ) {}
  async create(
    { cai, ...createCompanyCaiDto }: CreateCompanyCaiDto,
    correo: string,
  ) {
    cai = cai.toUpperCase();
    try {
      const Company: Company = await this._companyRepo.findOne({
        where: {
          id: createCompanyCaiDto.id_empresa,
          borrado: false,
          creado_por: correo,
        },
      });
      if (!Company) throw new BadRequestException('La empresa no existe');

      const companyCaiExist: CompanyCai = await this._companyCaiRepo.findOne({
        where: {
          id_empresa: createCompanyCaiDto.id_empresa,
          cai: cai,
          creado_por: correo,
        },
      });
      if (companyCaiExist) throw new BadRequestException('El CAI ya existe');

      const companyCai = await this._companyCaiRepo.findOne({
        where: {
          id_empresa: createCompanyCaiDto.id_empresa,
          creado_por: correo,
          hasta: createCompanyCaiDto.desde - 1,
          fecha_limite: LessThan(createCompanyCaiDto.fecha_limite),
        },
        order: { fecha_creacion: 'DESC' },
      });

      if (companyCai)
        return await this._companyCaiRepo.save({
          ...createCompanyCaiDto,
          cai,
          creado_por: correo,
          fecha_creacion: new Date(),
        });
      else
        throw new BadRequestException(
          'El correlativo desde debe ser mayor al correlativo hasta O la Fecha Limite debe ser mayor a la fecha limite del último CAI',
        );
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
