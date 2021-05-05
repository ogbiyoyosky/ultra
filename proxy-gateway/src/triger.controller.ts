import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateGameResponseDto,ApplyDiscountResponseDto, DeleteGameResponseDto, FlushGameResponseDto, GetGamePublisherResponseDto, GetGameResponseDto, GetGamesResponseDto } from './interfaces/game/dto/games.dto';
import { IGame } from './interfaces/game/game.interface';
import { IServiceDeleteGameResponse, IServiceGetGameResponse, IServiceCreateGameResponse, IServiceGetGamesResponse, IServiceFlushGame, IServiceApplyDiscount, IServiceGetGamePublisherResponse } from './interfaces/game/get-games.interface';


@Controller('trigger')
export class TriggerController {
  constructor(
    @Inject('GAME_SERVICE') private readonly client: ClientProxy
    ) {}
    
  @Get('apply-discount')
   public async applyDiscount(): Promise<ApplyDiscountResponseDto> {
     const gamesResponse: IServiceApplyDiscount = await this.client
     .send({cmd:'APPLY_DISCOUNT'},'')
       .toPromise();
     return {
       message: gamesResponse.message,
       data: null,
       errors: null || gamesResponse.errors,
     };
  }

  /**
   * 
   * @param gameId delete games older than 18 months
   * @returns 
   */
  @Get('flush-games')
   public async flushGame(): Promise<FlushGameResponseDto> {
     console.log("HEHEHEHtttt")
 
     const gamesResponse: IServiceFlushGame = await this.client
     .send({cmd:'FLUSH_GAME'}, '')
       .toPromise();
     return {
       message: gamesResponse.message,
       data: null,
       errors: null || gamesResponse.errors,
     };
  }
}
