import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
     transport: Transport.RMQ,
     options: { 
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.GAME_QUEUE,
          queueOptions: { 
             durable: false
            },
           },
   });
 await app.listen(() => console.log('Game Service is listening'));
}
bootstrap();