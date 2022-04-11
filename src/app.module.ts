import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LogModule } from './modules/log/log.module';
import { SharedService } from './shared/share/shared.service';
import { ConfigsModule } from './modules/configs/configs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './environments/configuration.service';
import { BlockedModule } from './modules/blocked/blocked.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    LogModule,
    ConfigsModule,
    BlockedModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
