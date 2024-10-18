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
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/helpers/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('clients')
@ApiTags('Clientes')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'El cliente ha sido creado',
    type: Client,
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  create(@Body() createClientDto: CreateClientDto, @Req() req: any) {
    return this.clientsService.create(createClientDto, req.user.correo);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: [Client],
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  findAll(@Query() paginationDto: PaginationDto, @Req() req: any) {
    return this.clientsService.findAll(paginationDto, req.user.correo);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: Client })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.clientsService.findOne(id, req.user.correo);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado',
    type: Client,
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: any,
  ) {
    return this.clientsService.update(id, updateClientDto, req.user.correo);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.clientsService.remove(id, req.user.correo);
  }
}
