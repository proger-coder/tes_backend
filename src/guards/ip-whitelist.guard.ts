import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { IpWhitelistService } from '../services/ip-whitelist.service';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(private readonly ipWhitelistService: IpWhitelistService) {}

  canActivate(context: ExecutionContext): boolean {
    //console.log('Guard is triggered for path:', context.switchToHttp().getRequest().path);
    console.log('context.getHandler() = ', context.getHandler());
    console.log('context.getArgs() = ', context.getArgs());
    console.log('context.getClass() = ', context.getClass());
    const request = context.switchToHttp().getRequest();
    // исключение для главной страницы
    if (request.path !== '/') {
      return true;
    }

    const ipFromList = this.ipWhitelistService.check(request.ip);
    if (ipFromList) {
      return true;
    }
    throw new ForbiddenException('Доступ запрещён по списку IP');
  }
}
