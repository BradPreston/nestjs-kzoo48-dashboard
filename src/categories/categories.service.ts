import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createCategoryDtoErrors = plainToInstance(
      CreateCategoryDto,
      createCategoryDto,
    );
    const dtoErrors = await validate(createCategoryDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        status: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        status: true,
      },
    });
    if (!category)
      throw new NotFoundException(`No category with id "${id}" was found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategoryDtoErrors = plainToInstance(
      UpdateCategoryDto,
      updateCategoryDto,
    );
    const dtoErrors = await validate(updateCategoryDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const removedCategory = await this.prisma.category.delete({
      where: { id },
    });
    if (!removedCategory) {
      throw new NotFoundException(`No category with id "${id}" was found`);
    }
    return removedCategory;
  }
}
