import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EntriesModule } from './entries/entries.module';
import { VolunteersModule } from './volunteers/volunteers.module';

@Module({
  imports: [PrismaModule, EntriesModule, VolunteersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
