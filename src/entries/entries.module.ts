import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';

@Module({
  controllers: [EntriesController],
  providers: [EntriesService],
  imports: [PrismaModule],
})
export class EntriesModule {}
