import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto) {
    return await this.statusesService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.statusesService.findOne(+id);
  }

  @Patch(':id')
  updatePatch(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusesService.update(+id, updateStatusDto);
  }

  @Put(':id')
  updatePut(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusesService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.statusesService.remove(+id);
  }
}
