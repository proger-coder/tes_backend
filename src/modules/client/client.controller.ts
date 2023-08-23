import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { Client } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Создание клиента' })
  @ApiBody({ description: 'Данные клиента', type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Клиент успешно создан.' })
  @ApiResponse({ status: 400, description: 'Неверный запрос.' })
  @Post()
  async create(@Body() clientData: CreateClientDto): Promise<Client> {
    const fixedClientData = plainToInstance(CreateClientDto, clientData);
    return this.clientService.create(fixedClientData);
  }

  @ApiOperation({ summary: 'Получение информации о клиенте' })
  @ApiParam({ name: 'id', description: 'ID клиента' })
  @ApiResponse({ status: 200, description: 'Успешное выполнение.' })
  @ApiResponse({ status: 404, description: 'Клиент не найден.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException('Клиент не найден :[');
    }
    return client;
  }
}
