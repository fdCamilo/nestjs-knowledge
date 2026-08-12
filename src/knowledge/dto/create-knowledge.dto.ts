import { IsNumber, IsString, Max, MinLength } from 'class-validator';

export class CreateKnowledgeDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    content: string;
}

export class CreateKnowledgeDirectDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    content: string;

    @IsNumber()
    @Max(2026)
    year: number;
}
