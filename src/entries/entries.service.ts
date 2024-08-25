import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    const createEntryDtoErrors = plainToInstance(
      CreateEntryDto,
      createEntryDto,
    );
    const dtoErrors = await validate(createEntryDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.entry.create({ data: createEntryDto });
  }

  async findAll() {
    return await this.prisma.entry.findMany();
  }

  async findOne(id: number) {
    const entry = await this.prisma.entry.findUnique({ where: { id } });
    if (!entry)
      throw new NotFoundException(`No entry with id "${id}" was found`);
    return entry;
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    const updateEntryDtoErrors = plainToInstance(
      UpdateEntryDto,
      updateEntryDto,
    );
    const dtoErrors = await validate(updateEntryDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.entry.update({
      where: { id },
      data: updateEntryDto,
    });
  }

  async remove(id: number) {
    const removedEntry = await this.prisma.entry.delete({ where: { id } });
    if (!removedEntry) {
      throw new NotFoundException(`No entry with id "${id}" was found`);
    }
    return removedEntry;
  }
}
