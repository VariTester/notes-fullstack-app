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

  // Crear nota
  create(noteData: Partial<Note>): Promise<Note> {
    const note = this.notesRepository.create(noteData);
    return this.notesRepository.save(note);
  }

  // Listar notas activas (incluye categoría)
  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: false },
      relations: ['category'],
    });
  }

  // Listar notas archivadas (incluye categoría)
  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: true },
      relations: ['category'],
    });
  }

  // 🔥 NUEVO: Filtrar notas por categoría
  findByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        category: { id: categoryId },
        archived: false,
      },
      relations: ['category'],
    });
  }

  // 🔥 NUEVO OPCIONAL: Filtrar archivadas por categoría
  findArchivedByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        category: { id: categoryId },
        archived: true,
      },
      relations: ['category'],
    });
  }

  // Editar nota
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

    // Actualizar datos
    await this.notesRepository.update(id, data);

    // Retornar nota actualizada con categoría incluida
    const updated = await this.notesRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!updated) {
      throw new Error(`Note with id ${id} not found`);
    }

    return updated;
  }

  // Archivar / desarchivar
  async toggleArchive(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }

    note.archived = !note.archived;
    return this.notesRepository.save(note);
  }

  // Eliminar nota
  delete(id: number): Promise<void> {
    return this.notesRepository.delete(id).then(() => undefined);
  }
}
