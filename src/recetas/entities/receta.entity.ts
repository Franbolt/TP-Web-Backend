import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity.js';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @Column()
  nombre: string;

  @Column()
  tiempo: number;

  @Column({ type: 'text' })
  ingredientes: string;

  @Column({ type: 'text' })
  preparacion: string;

  @Column()
  porciones: number;
}
