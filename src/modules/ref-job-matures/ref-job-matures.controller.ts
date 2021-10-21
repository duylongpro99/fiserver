import { Controller } from '@nestjs/common';
import { RefJobMaturesService } from './ref-job-matures.service';

@Controller('ref-job-matures')
export class RefJobMaturesController {
  constructor(private readonly refJobMaturesService: RefJobMaturesService) {}
}
