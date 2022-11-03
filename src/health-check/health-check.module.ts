import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
