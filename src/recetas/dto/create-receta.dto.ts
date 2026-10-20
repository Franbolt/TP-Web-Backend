import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecetaDto {
  @IsInt()
  idCategoria: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  tiempo: number;

  @IsString()
  @IsNotEmpty()
  ingredientes: string;

  @IsString()
  @IsNotEmpty()
  preparacion: string;

  @IsInt()
  porciones: number;
}
