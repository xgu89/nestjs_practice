import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// #1 application middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('From application middleware, Request...');
    next();
  }
}
// #2 function middleware
export function logger(req, res, next) {
  console.log(`From function middleware, Request...`);
  next();
}
