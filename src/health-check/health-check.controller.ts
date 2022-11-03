import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const path = 'health-check';

@Controller({ path })
export class HealthCheckController {
  constructor(private configService: ConfigService) {}
  @Get()
  index() {
    return this.configService.get<string>('TEST');
  }
}
