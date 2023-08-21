import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Client } from '@prisma/client';
import { CreateClientDto } from './DTO/CreateClientDto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.prisma.client.create({ data: createClientDto });
  }

  async findOne(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  // Дополнительные методы могут быть добавлены по мере необходимости.
}
