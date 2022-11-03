import {Module, ValidationPipe} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from "@nestjs/mongoose";
import {APP_PIPE} from "@nestjs/core";

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
      useFactory: async (configService: ConfigService) => ({
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
      envFilePath: [`${process.env.NODE_ENV}`.length == 0 ? join(__dirname, `config/.env.${process.env.NODE_ENV}`) : join(__dirname, 'config/.env')],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_CONNECTION')
        return {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
          uri
        }
      }
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
