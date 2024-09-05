import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';

@Module({
  controllers: [VolunteersController],
  providers: [VolunteersService],
  imports: [PrismaModule],
})
export class VolunteersModule {}
