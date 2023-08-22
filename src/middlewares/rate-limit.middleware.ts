import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

//7.	Ограничение по количеству запросов на получение текущего счета в день

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'limit_req',
  points: 10, // макс количество запросов
  duration: 86400, // в секундах (24 часа)
});

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await rateLimiter.consume(req.ip); // используем IP-адрес для идентификации клиента
      next();
    } catch (error) {
      res
        .status(429)
        .send(
          `Слишком много запросов с вашего IP (${req.ip}): разрешено ${rateLimiter.points} в сутки`,
        );
    }
  }
}
