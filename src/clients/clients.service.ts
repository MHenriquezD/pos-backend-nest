import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { handleDBErrors } from 'src/helpers/error.helper';
import { PaginationDto } from 'src/helpers/pagination.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private _clientRepo: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto, correo: string) {
    try {
      return await this._clientRepo.save({
        ...createClientDto,
        creado_por: correo,
        fecha_creacion: new Date(),
      });
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async findAll(
    { itemsPerPage = 10, currentPage = 1, search = '' }: PaginationDto,

    correo: string,
  ) {
    itemsPerPage = +itemsPerPage;
    currentPage = +currentPage;
    const [clientes, count] = await this._clientRepo
      .createQueryBuilder('client')
      .where('client.creado_por = :correo', { correo })
      .andWhere(
        search ? '(client.nombre ILIKE :search)' : '1=1',
        search ? { search: `%${search}%` } : {},
      )
      .andWhere('client.eliminado = false')
      .orderBy('client.fecha_creacion', 'DESC')
      .take(+itemsPerPage)
      .skip((+currentPage - 1) * +itemsPerPage)
      .getManyAndCount();

    const totalPages = Math.ceil(count / +itemsPerPage);

    return {
      clientes,
      pagination: {
        itemsPerPage,
        currentPage,
        totalPages,
        totalItems: count,
      },
    };
  }

  async findOne(id: string, correo: string) {
    return await this._clientRepo.findOne({
      where: { id, creado_por: correo },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto, correo: string) {
    try {
      const client = await this._clientRepo.findOne({
        where: { id, creado_por: correo },
      });
      if (!client) throw new BadRequestException('El cliente no existe');
      Object.assign(client, updateClientDto);
      return await this._clientRepo.save(client);
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async remove(id: string, correo: string) {
    try {
      const cliente = await this._clientRepo.findOne({
        where: { id, creado_por: correo },
      });
      if (!cliente) throw new BadRequestException('El cliente no existe');

      Object.assign(cliente, {
        eliminado: true,
        fecha_eliminacion: new Date(),
        eliminado_por: correo,
      });
      const { eliminado } = await this._clientRepo.save(cliente);
      if (!eliminado) throw new InternalServerErrorException();
      return {
        statusCode: 200,
        message: 'Cliente eliminado correctamente',
      };
    } catch (error) {}
  }
}
