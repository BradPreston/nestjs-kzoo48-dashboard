import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  create(createEntryDto: CreateEntryDto) {
    return 'This action adds a new entry';
  }

  findAll() {
    return this.prisma.entry.findMany();
  }

  findOne(id: number) {
    return this.prisma.entry.findUnique({ where: { id } });
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
