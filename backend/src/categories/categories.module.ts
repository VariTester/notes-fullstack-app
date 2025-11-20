import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Note } from 'src/notes/note.entity'; // ⭐ IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Note]), // ⭐ AÑADIR Note aquí
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
