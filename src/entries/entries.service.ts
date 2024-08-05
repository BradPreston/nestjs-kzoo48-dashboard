import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    try {
      return await this.prisma.entry.create({ data: createEntryDto });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // TODO: cleanup this message, this is a little 'hacky'
        const createErrorMessage = err.message.split('\n');
        throw new BadRequestException(
          createErrorMessage[createErrorMessage.length - 1],
        );
      }
      // if error is not from a client validation issue
      throw new BadRequestException(err.message);
    }
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
    try {
      return await this.prisma.entry.update({
        where: { id },
        data: updateEntryDto,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // TODO: cleanup this message, this is a little 'hacky'
        const createErrorMessage = err.message.split('\n');
        throw new BadRequestException(
          createErrorMessage[createErrorMessage.length - 1],
        );
      }
      // if error is not from a client validation issue
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.entry.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`No entry with id "${id}" was found`);
      }
      throw new BadRequestException('Something went wrong');
    }
  }
}
