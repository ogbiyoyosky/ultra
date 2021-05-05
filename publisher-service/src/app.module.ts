import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublisherModule } from './publisher/publisher.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),PublisherModule,MongooseModule.forRoot(process.env.MONGO_URL_PUBLISHER)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
