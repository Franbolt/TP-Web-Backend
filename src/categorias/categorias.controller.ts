import { Controller, Get, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service.js';
import { Categoria } from './entities/categoria.entity.js';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria | null> {
    return this.categoriasService.findOne(+id);
  }
}
