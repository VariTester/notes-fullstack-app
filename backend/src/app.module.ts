import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'notes_user',
      password: '12345678',
      database: 'notes_db',
      entities: [Note, Category],
      synchronize: true,
    }),
    NotesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
