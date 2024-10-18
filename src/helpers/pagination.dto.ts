import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  currentPage: number;

  @IsOptional()
  itemsPerPage: number;

  @IsOptional()
  search: string;

  @IsOptional()
  childs: boolean;
}
