import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameSchema } from './game.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forFeature([{name: 'Game', schema: GameSchema}]),ClientsModule.register([
    { 
      name: 'PUBLISHER_SERVICE', transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.PUBLISHER_QUEUE,
        queueOptions: {
          durable: false
              },
        },
     },
     { 
      name: 'GAME_SERVICE', transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue:  process.env.GAME_QUEUE,
        queueOptions: {
          durable: false
              },
        },
     },
   ]),],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
