// backend/src/notes/notes.controller.ts
import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() noteData: Partial<Note>): Promise<Note> {
    return this.notesService.create(noteData);
  }

  @Get()
  findAllActive(): Promise<Note[]> {
    return this.notesService.findAllActive();
  }

  @Get('archived')
  findAllArchived(): Promise<Note[]> {
    return this.notesService.findAllArchived();
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string): Promise<Note[]> {
    return this.notesService.findByCategory(+categoryId);
  }

  @Get('category/:categoryId/archived')
  findArchivedByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Note[]> {
    return this.notesService.findArchivedByCategory(+categoryId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() noteData: UpdateNoteDto
  ): Promise<Note> {
    return this.notesService.update(+id, noteData);
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id') id: string): Promise<Note> {
    return this.notesService.toggleArchive(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.notesService.delete(+id);
  }
}
