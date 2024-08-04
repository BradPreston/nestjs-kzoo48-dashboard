import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [PrismaModule, EntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
