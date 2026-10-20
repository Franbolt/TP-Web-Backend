import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import { Receta } from './entities/receta.entity.js';
import { Categoria } from '../categorias/entities/categoria.entity.js';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private recetasRepository: Repository<Receta>,
    private categoriasService: CategoriasService,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    await this.categoriasService.findOne(createRecetaDto.idCategoria);
    const receta = this.recetasRepository.create({
      ...createRecetaDto,
      categoria: { id: createRecetaDto.idCategoria },
    });
    return this.recetasRepository.save(receta);
  }

  findAll(categoriaId?: number): Promise<Receta[]> {
    return this.recetasRepository.find({
      relations: { categoria: true },
      where: categoriaId ? { categoria: { id: categoriaId } } : {},
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Receta> {
    const receta = await this.recetasRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (!receta) {
      throw new NotFoundException(`La receta ${id} no existe`);
    }
    return receta;
  }

  async update(id: number, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const receta = await this.findOne(id);
    const { idCategoria, ...resto } = updateRecetaDto;
    Object.assign(receta, resto);
    if (idCategoria !== undefined) {
      await this.categoriasService.findOne(idCategoria);
      receta.categoria = { id: idCategoria } as Categoria;
    }
    return this.recetasRepository.save(receta);
  }

  async remove(id: number): Promise<void> {
    const receta = await this.findOne(id);
    await this.recetasRepository.remove(receta);
  }
}
