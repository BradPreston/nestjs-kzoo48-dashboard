import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createPasswordHash } from 'utils/create-password-hash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const createUserDtoErrors = plainToInstance(CreateUserDto, createUserDto);
    const dtoErrors = await validate(createUserDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    const newUser: CreateUserDto = {
      email: createUserDto.email,
      password: await createPasswordHash(createUserDto.password),
      statusId: createUserDto.statusId,
    };
    return await this.prisma.user.create({ data: newUser });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string | number) {
    if (typeof id === 'number') {
      const user = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
        include: {
          status: true,
        },
      });
      if (!user)
        throw new NotFoundException(`No user with id "${id}" was found`);
      return user;
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
      include: {
        status: true,
      },
    });
    if (!user)
      throw new NotFoundException(`No user with email "${id}" was found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUserDtoErrors = plainToInstance(UpdateUserDto, updateUserDto);
    const dtoErrors = await validate(updateUserDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    const updatedUser: UpdateUserDto = {
      email: updateUserDto.email,
      password: await createPasswordHash(updateUserDto.password),
      statusId: updateUserDto.statusId,
    };
    return await this.prisma.user.update({ where: { id }, data: updatedUser });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
