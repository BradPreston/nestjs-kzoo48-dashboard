import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class VolunteersService {
  constructor(private prisma: PrismaService) {}

  async create(createVolunteerDto: CreateVolunteerDto) {
    const createVolunteerDtoErrors = plainToInstance(
      CreateVolunteerDto,
      createVolunteerDto,
    );
    const dtoErrors = await validate(createVolunteerDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.volunteer.create({
      data: createVolunteerDto,
    });
  }

  async findAll() {
    return await this.prisma.volunteer.findMany({
      include: {
        status: true,
      },
    });
  }

  async findOne(id: number) {
    const volunteer = await this.prisma.volunteer.findUnique({
      where: { id },
      include: { status: true },
    });
    if (!volunteer)
      throw new NotFoundException(`No volunteer with id "${id}" was found`);
    return volunteer;
  }

  async update(id: number, updateVolunteerDto: UpdateVolunteerDto) {
    const updateVolunteerDtoErrors = plainToInstance(
      UpdateVolunteerDto,
      updateVolunteerDto,
    );
    const dtoErrors = await validate(updateVolunteerDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.volunteer.update({
      where: { id },
      data: updateVolunteerDto,
    });
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
