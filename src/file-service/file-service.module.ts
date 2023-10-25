import { Module } from '@nestjs/common';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';

@Module({
  controllers: [FileServiceController],
  providers: [FileServiceService],
})
export class FileServiceModule {}
