// backend/src/notes/note.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Note {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: false })
  archived: boolean;

  // Columna explícita para manejar categoryId (opcional pero recomendado)
  @Column({ nullable: true })
  categoryId: number | null;

  @ManyToOne(() => Category, (cat) => cat.notes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
