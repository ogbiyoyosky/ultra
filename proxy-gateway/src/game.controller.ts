import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateGameResponseDto,ApplyDiscountResponseDto, DeleteGameResponseDto, FlushGameResponseDto, GetGamePublisherResponseDto, GetGameResponseDto, GetGamesResponseDto } from './interfaces/game/dto/games.dto';
import { IGame } from './interfaces/game/game.interface';
import { IServiceDeleteGameResponse, IServiceGetGameResponse, IServiceCreateGameResponse, IServiceGetGamesResponse, IServiceFlushGame, IServiceApplyDiscount, IServiceGetGamePublisherResponse } from './interfaces/game/get-games.interface';


@Controller('games')
export class GameController {
  constructor(
    @Inject('GAME_SERVICE') private readonly client: ClientProxy
    ) {}
    

    /**
     * 
     * @param gameRequest Create a game
     * @returns 
     */
    @Post()
    public async createGame(
      @Body() gameRequest: IGame,
    ): Promise<CreateGameResponseDto> {
      

      const gamesResponse: IServiceCreateGameResponse = await this.client
        .send({cmd: 'CREATE_GAME'}, gameRequest)
        .toPromise();

      return {
        message: gamesResponse.message,
        data: {
          games: gamesResponse.game,
        },
        errors: null || gamesResponse.errors,
      };
   }

   /**
     * 
     * @param gameRequest Update a game
     * @returns 
     */
    @Patch(':gameId')
    public async updateGame(
      @Body() gameRequest: IGame,
      @Param('gameId') gameId: string
    ): Promise<CreateGameResponseDto> {
      

      const gamesResponse: IServiceCreateGameResponse = await this.client
        .send({cmd: 'UPDATE_GAME'}, {gameId, gameRequest})
        .toPromise();

      return {
        message: gamesResponse.message,
        data: {
          games: gamesResponse.game,
        },
        errors: null || gamesResponse.errors,
      };
   }

   /**
    * 
    * @returns Fetch games
    */
   @Get()
    public async getGames(): Promise<GetGamesResponseDto> {
  
      const gamesResponse: IServiceGetGamesResponse = await this.client
        .send({cmd:'FETCH_GAMES'},'')
        .toPromise();
        
  
      return {
        message: gamesResponse.message,
        data: {
          games: gamesResponse.games,
        },
        errors: null || gamesResponse.errors,
      };
   }

   /**
    * 
    * @param gameId Fetch a game By Id
    * @returns 
    */
   @Get(':gameId')
   public async getGameById(@Param('gameId') gameId: string): Promise<GetGameResponseDto> {
     const gamesResponse: IServiceGetGameResponse = await this.client
       .send({cmd:'FETCH_GAME_BY_ID'},gameId)
       .toPromise();
 
     return {
       message: gamesResponse.message,
       data: {
         game: gamesResponse.game,
       },
       errors: null || gamesResponse.errors,
     };
  }

  /**
   * 
   * @param gameId Fetch game Publisher from game Api
   * @returns 
   */
  @Get(':gameId/publisher')
   public async getPublisherByGameId(@Param('gameId') gameId: string): Promise<GetGamePublisherResponseDto> {
     const gamesResponse: IServiceGetGamePublisherResponse = await this.client
       .send({ cmd: 'FETCH_PUBLISHER_GAME_ID' }, gameId)
       .toPromise();
 
     return {
       message: gamesResponse.message,
       data: gamesResponse.data,
       errors: null || gamesResponse.errors,
     };
  }

  /**
   * 
   * @returns Delete a single game
   */
  @Delete(':gameId')
   public async deleteGameById(): Promise<DeleteGameResponseDto> {
     const gamesResponse: IServiceDeleteGameResponse = await this.client
     .send({cmd:'DELETE_GAME_BY_ID'},'')
       .toPromise();


     return {
       message: gamesResponse.message,
       data: {
         games: null,
       },
       errors: null || gamesResponse.errors,
     };
  }

  /**
   * 
   * @returns Apply discount of 20% on games with relase date between 12-18 months
   */
  @Get('/apply-discount')
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
  @Get('/flush-games')
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
