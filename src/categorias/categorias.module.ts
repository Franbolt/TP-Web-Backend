import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service.js';
import { CategoriasController } from './categorias.controller.js';
import { Categoria } from './entities/categoria.entity.js';
import { Receta } from '../recetas/entities/receta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Receta])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService],
})
export class CategoriasModule {}
