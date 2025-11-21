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

  findAll() {
    return this.categoryRepo.find({ order: { name: 'ASC' } });
  }

  create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    category.name = dto.name;
    return this.categoryRepo.save(category);
  }

async delete(id: number) {
  const category = await this.categoryRepo.findOne({ where: { id } });
  if (!category) throw new NotFoundException('Categoría no encontrada');

  await this.noteRepo
    .createQueryBuilder()
    .update(Note)
    .set({ category: null })
    .where('"categoryId" = :id', { id })
    .execute();

  return this.categoryRepo.delete(id);
}

}
