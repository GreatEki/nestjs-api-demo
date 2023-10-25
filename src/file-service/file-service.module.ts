import { Module } from '@nestjs/common';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.UPLOAD_RATE_TTL),
        limit: Number(process.env.UPLOAD_RATE_LIMIT),
      },
    ]),
  ],
  controllers: [FileServiceController],
  providers: [
    FileServiceService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class FileServiceModule {}
