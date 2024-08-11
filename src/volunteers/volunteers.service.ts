import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VolunteersService {
  constructor(private prisma: PrismaService) {}

  create(createVolunteerDto: CreateVolunteerDto) {
    return 'This action adds a new volunteer';
  }

  async findAll() {
    return await this.prisma.volunteer.findMany();
  }

  async findOne(id: number) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer)
      throw new NotFoundException(`No volunteer with id "${id}" was found`);
    return volunteer;
  }

  update(id: number, updateVolunteerDto: UpdateVolunteerDto) {
    return `This action updates a #${id} volunteer`;
  }

  async remove(id: number) {
    try {
      return await this.prisma.volunteer.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`No volunteer with id "${id}" was found`);
      }
      throw new BadRequestException('Something went wrong');
    }
  }
}
