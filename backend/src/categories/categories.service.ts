import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Note } from 'src/notes/note.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  // Listar todas las categorías
  findAll() {
    return this.categoryRepo.find({ order: { name: 'ASC' } });
  }

  // Crear categoría
  create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  // Editar categoría
  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    category.name = dto.name;
    return this.categoryRepo.save(category);
  }

  // Eliminar categoría
async delete(id: number) {
  const category = await this.categoryRepo.findOne({ where: { id } });
  if (!category) throw new NotFoundException('Categoría no encontrada');

  // Quitar la categoría de todas las notas (asegurado para cualquier FK real)
  await this.noteRepo
    .createQueryBuilder()
    .update(Note)
    .set({ category: null })
    .where('"categoryId" = :id', { id })
    .execute();

  // Eliminar categoría
  return this.categoryRepo.delete(id);
}

}
