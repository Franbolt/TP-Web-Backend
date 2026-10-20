import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from '../recetas/entities/receta.entity.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { Categoria } from './entities/categoria.entity.js';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    @InjectRepository(Receta)
    private recetasRepository: Repository<Receta>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasRepository.save(createCategoriaDto);
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`La categoría ${id} no existe`);
    }
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    const recetasAsociadas = await this.recetasRepository.count({
      where: { categoria: { id } },
    });
    if (recetasAsociadas > 0) {
      throw new ConflictException(
        `No se puede eliminar la categoría ${id}: tiene ${recetasAsociadas} receta(s) asociada(s). Eliminá primero esas recetas.`,
      );
    }
    await this.categoriasRepository.remove(categoria);
  }
}
