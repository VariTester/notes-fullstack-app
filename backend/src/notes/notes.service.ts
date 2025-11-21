// backend/src/notes/notes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(noteData: Partial<Note>): Promise<Note> {
    const note = this.notesRepository.create(noteData);
    return this.notesRepository.save(note);
  }

  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: false },
      relations: ['category'],
    });
  }


  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: true },
      relations: ['category'],
    });
  }

  findByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        category: { id: categoryId },
        archived: false,
      },
      relations: ['category'],
    });
  }

  findArchivedByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        category: { id: categoryId },
        archived: true,
      },
      relations: ['category'],
    });
  }

  async update(id: number, data: any): Promise<Note> {
    // Manejar cambio de categoría
    if (data.categoryId !== undefined) {
      if (data.categoryId === null || data.categoryId === '') {
        data.category = null;
      } else {
        data.category = { id: data.categoryId };
      }

      delete data.categoryId;
    }

    await this.notesRepository.update(id, data);


    const updated = await this.notesRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!updated) {
      throw new Error(`Note with id ${id} not found`);
    }

    return updated;
  }

  async toggleArchive(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }

    note.archived = !note.archived;
    return this.notesRepository.save(note);
  }

  delete(id: number): Promise<void> {
    return this.notesRepository.delete(id).then(() => undefined);
  }
}
