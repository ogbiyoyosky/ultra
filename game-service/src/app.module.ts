import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),GameModule,
  MongooseModule.forRoot(process.env.MONGO_URL_GAME)],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
