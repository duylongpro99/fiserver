import { PartialType } from '@nestjs/mapped-types';
import { CreateMatureDto } from './create-mature.dto';

export class UpdateMatureDto extends PartialType(CreateMatureDto) {}
