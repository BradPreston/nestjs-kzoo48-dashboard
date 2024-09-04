import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async create(createStatusDto: CreateStatusDto) {
    const createStatusDtoErrors = plainToInstance(
      CreateStatusDto,
      createStatusDto,
    );
    const dtoErrors = await validate(createStatusDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.status.create({ data: createStatusDto });
  }

  async findAll() {
    return this.prisma.status.findMany();
  }

  async findOne(id: number) {
    const status = await this.prisma.status.findUnique({ where: { id } });
    if (!status)
      throw new NotFoundException(`No status with id "${id}" was found`);
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const updateStatusDtoErrors = plainToInstance(
      UpdateStatusDto,
      updateStatusDto,
    );
    const dtoErrors = await validate(updateStatusDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.status.update({
      where: { id },
      data: updateStatusDto,
    });
  }

  async remove(id: number) {
    const status = await this.prisma.status.delete({ where: { id } });
    if (!status)
      throw new NotFoundException(`No status with id "${id}" was found`);
    return status;
  }
}
