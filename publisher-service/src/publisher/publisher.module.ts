import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherController } from './publisher.controller';
import { PublisherSchema } from './publisher.schema';
import { PublisherService } from './publisher.service';

@Module({
    imports:[MongooseModule.forFeature([{name: 'Publisher', schema: PublisherSchema}])],
    providers: [PublisherService],
    controllers: [PublisherController]
})
export class PublisherModule {}
