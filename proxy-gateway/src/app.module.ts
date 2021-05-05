import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GameController } from './game.controller';
import { ConfigModule } from '@nestjs/config';
import { TriggerController } from './triger.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
    { 
      name: 'GAME_SERVICE', transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.GAME_QUEUE,
        queueOptions: {
          durable: false
              },
        },
     },
   ]),
  ],
  controllers: [GameController,TriggerController],
  providers: [],
})
export class AppModule {}
