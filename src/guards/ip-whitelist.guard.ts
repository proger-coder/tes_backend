import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { IpWhitelistService } from '../services/ip-whitelist.service';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(private readonly ipWhitelistService: IpWhitelistService) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('Guard is triggered for path:', context.switchToHttp().getRequest().path);
    const request = context.switchToHttp().getRequest();
    // исключение для главной страницы
    // if (request.path !== '/') {
    //   throw new ForbiddenException('Доступ запрещён по списку IP');
    // }
    throw new ForbiddenException('гард блочит вообще всё!');
    //return true;
    //const clientIp = request.ip;
    //return this.ipWhitelistService.check(clientIp);
  }
}
