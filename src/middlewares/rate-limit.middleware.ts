import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimiter = new RateLimiterMemory({
    points: 10, // количество запросов
    duration: 86400, // один день в секундах
  });

  use(req: Request, res: Response, next: NextFunction) {
    console.log('req ip = ', req.ip);
    next();
    // this.rateLimiter.consume(req.ip)
    //   .then(() => next())
    //   .catch(() => res.status(429).send('Too Many Requests'));
  }
}
