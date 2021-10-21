import { MaturesModule } from './modules/matures/matures.module';
import { Company } from './modules/companies/entities/company.entity';
import { JobsModule } from './modules/jobs/jobs.module';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/item/item.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RedisCacheModule,
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemModule,
    UsersModule,
    AuthModule,
    JobsModule,
    CompaniesModule,
    LocationModule,
    MaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
