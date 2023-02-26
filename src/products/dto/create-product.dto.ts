import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, MinLength } from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    description: 'Product title (unique)',
    nullable: true,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  sotock?: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true }) //* Especifica si el valor validado es una matriz y cada uno de sus elementos debe validarse.
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true }) //* Especifica si el valor validado es una matriz y cada uno de sus elementos debe validarse.
  @IsArray()
  @IsOptional()
  images?: string[];
}
