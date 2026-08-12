// import { PartialType } from '@nestjs/swagger';
// import { CreateKnowledgeDto } from './create-knowledge.dto';

// export class UpdateKnowledgeDto extends PartialType(CreateKnowledgeDto) {}

export interface UpdateKnowledgeDto {
    name?: string;
    content?: string;
}
