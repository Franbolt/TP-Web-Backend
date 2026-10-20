import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from '../categorias/categorias.module.js';
import { RecetasService } from './recetas.service.js';
import { RecetasController } from './recetas.controller.js';
import { Receta } from './entities/receta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Receta]), CategoriasModule],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
