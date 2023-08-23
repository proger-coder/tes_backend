import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Client } from '@prisma/client';
import { CreateClientDTO } from './DTO/CreateClientDTO';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDTO): Promise<Client> {
    try {
      return await this.prisma.client.create({ data: createClientDto });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Этот документ засвечен! :[');
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Клиент с таким id (${id}) не найден :[`);
    }

    return client;
  }
}
