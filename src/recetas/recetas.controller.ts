import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import { Receta } from './entities/receta.entity.js';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto): Promise<Receta> {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  findAll(@Query('categoria') categoria?: string): Promise<Receta[]> {
    return this.recetasService.findAll(
      categoria ? Number(categoria) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Receta> {
    return this.recetasService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecetaDto: UpdateRecetaDto,
  ): Promise<Receta> {
    return this.recetasService.update(id, updateRecetaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.recetasService.remove(id);
  }
}
