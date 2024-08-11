import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post()
  create(@Body(ValidationPipe) createVolunteerDto: CreateVolunteerDto) {
    return this.volunteersService.create(createVolunteerDto);
  }

  @Get()
  findAll() {
    return this.volunteersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.volunteersService.findOne(+id);
  }

  @Patch(':id')
  updatePatch(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteersService.update(+id, updateVolunteerDto);
  }

  @Put(':id')
  updatePut(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteersService.update(+id, updateVolunteerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.volunteersService.remove(+id);
  }
}
