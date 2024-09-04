import { Category } from '@prisma/client';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

export const mockCategory: Category = {
  id: 1,
  name: 'test',
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const badMockCategory = {
  id: 1,
  name: 1,
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const newCategory: CreateCategoryDto = {
  name: 'test',
  statusId: 1,
};

export const mockCategoryUpdated: Category = {
  id: 1,
  name: 'test UPDATED',
  statusId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const goodUpdateCategoryMock: UpdateCategoryDto = {
  name: 'test UPDATED',
  statusId: 2,
};

export const badUpdateCategoryMock = {
  name: 1,
};
