import { IsString, IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, MinLength } from "class-validator";

export class CreateProductDto {

  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  sotock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsString({ each: true }) //* Especifica si el valor validado es una matriz y cada uno de sus elementos debe validarse.
  @IsArray()
  @IsOptional()
  tags: string[];

  @IsString({ each: true }) //* Especifica si el valor validado es una matriz y cada uno de sus elementos debe validarse.
  @IsArray()
  @IsOptional()
  images?: string[];
}
