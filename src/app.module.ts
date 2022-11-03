import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    HealthCheckModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'acdbuser',
    //   password: 'LiveRamp2019#',
    //   database: 'acdb',
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: 3306,
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [join(__dirname, 'config/.env'), join(__dirname, `config/.env.${process.env.NODE_ENV}`)],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
