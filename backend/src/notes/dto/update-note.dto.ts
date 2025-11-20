import { IsOptional, IsString, MinLength, IsNumber, ValidateIf } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  // Validar solo si NO es null
  @ValidateIf((o) => o.categoryId !== null)
  @IsOptional()
  @IsNumber()
  categoryId?: number | null;
}
