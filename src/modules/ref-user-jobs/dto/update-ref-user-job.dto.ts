import { PartialType } from '@nestjs/mapped-types';
import { CreateRefUserJobDto } from './create-ref-user-job.dto';

export class UpdateRefUserJobDto extends PartialType(CreateRefUserJobDto) {}
