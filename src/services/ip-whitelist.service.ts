import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class IpWhitelistService {
  private whitelist: Set<string> = new Set();

  constructor(private readonly prisma: PrismaService) {
    // грузим список белых ip из базы при старте приложения
    this.loadFromDatabase();
  }

  async loadFromDatabase() {
    const ips = await this.prisma.ipWhitelist.findMany();
    ips.forEach((ip) => this.whitelist.add(ip.ip_address));
  }

  async add(ip: string) {
    await this.prisma.ipWhitelist.create({ data: { ip_address: ip } });
    this.whitelist.add(ip);
  }

  async remove(ip: string) {
    await this.prisma.ipWhitelist.delete({ where: { ip_address: ip } });
    this.whitelist.delete(ip);
  }

  check(ip: string): boolean {
    return this.whitelist.has(ip);
  }
}
