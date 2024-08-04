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

  findAll() {
    return this.prisma.entry.findMany();
  }

  async findOne(id: number) {
    const entry = await this.prisma.entry.findUnique({ where: { id } });
    if (!entry)
      throw new NotFoundException(`No user with id "${id}" was found`);
    return entry;
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
