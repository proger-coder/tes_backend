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

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() clientData: CreateClientDto): Promise<Client> {
    console.log(clientData);
    const fixedClientData = plainToInstance(CreateClientDto, clientData);
    return this.clientService.create(fixedClientData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}