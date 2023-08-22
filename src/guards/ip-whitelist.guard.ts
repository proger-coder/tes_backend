import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IpWhitelistService } from '../services/ip-whitelist.service';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(private readonly ipWhitelistService: IpWhitelistService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    return this.ipWhitelistService.check(clientIp);
  }

  // canActivate(context: ExecutionContext): boolean {
  //   const request = context.switchToHttp().getRequest();
  //   const clientIp = request.ip;
  //   return this.whitelist.includes(clientIp);
  // }
}
