import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [PrismaModule],
})
export class StatusesModule {}
