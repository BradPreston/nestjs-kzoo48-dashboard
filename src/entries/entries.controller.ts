import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  create(@Body(ValidationPipe) createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.entriesService.findOne(+id);
  }

  @Patch(':id')
  updatePatch(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Put(':id')
  updatePut(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.entriesService.remove(+id);
  }
}
