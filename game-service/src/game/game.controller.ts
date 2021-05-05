import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ICreateGameResponse, IFetchGameResponse, IFetchGamesResponse, IUpdateGameResponse } from 'src/interfaces/game.response.interface';
import { IFetchPublisherResponse } from 'src/interfaces/pulisher.response.interface';
import { IGame } from './game.interface';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}
    
 @MessagePattern({cmd: 'CREATE_GAME'})
  public async createGame(data: IGame): Promise<ICreateGameResponse> {
      console.log(data)
    let result: ICreateGameResponse;
    if (data) {
      try {
        const createResult = await this.gameService.create(data);
        result = {
          status: HttpStatus.CREATED,
          message: 'game_create_success',
          game: createResult
        };
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'game_create_bad_request',
          game: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'game_create_bad_request',
        game: null,
      };
    }

    return result;
  }

  @MessagePattern({cmd: 'UPDATE_GAME'})
  public async updateGame(data: IGame): Promise<ICreateGameResponse> {
      console.log(data)
    let result: IUpdateGameResponse;
    if (data) {
      try {
        const createResult = await this.gameService.update (data);
        result = {
          status: HttpStatus.OK,
          message: 'game_create_success',
          game: createResult
        };
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'game_update_bad_request',
          game: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'game_update_bad_request',
        game: null,
      };
    }

    return result;
  }

  @MessagePattern({cmd: 'FETCH_GAMES'})
  public async getGames(): Promise<IFetchGamesResponse> {
    let result: IFetchGamesResponse;

      try {
        const queryResult = await this.gameService.fetchAllgames();
        result = {
          status: HttpStatus.OK,
          message: 'games_fetched',
          games: queryResult
        };
      } catch (e) {
        result = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'internal server error',
          games: null,
        };
      }

      return result;
  }

  @MessagePattern({cmd: 'FETCH_GAME_BY_ID'})
  public async getGameById(gameId): Promise<IFetchGameResponse> {
    let result: IFetchGameResponse;

      try {
        const queryResult = await this.gameService.findOne(gameId);

        
        result = {
          status: HttpStatus.OK,
          message: 'game_fetched',
          game: queryResult
        };
       
      } catch (e) {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'not_found',
          game: null,
          errors: e.message
        };
      }

      return result;
  }

  @MessagePattern({cmd: 'FETCH_PUBLISHER_GAME_ID'})
  public async getPublisherByGameId(gameId): Promise<IFetchPublisherResponse> {
    let result: IFetchPublisherResponse;
    
      try {
      
        const queryResult = await this.gameService.fetchPublisher(gameId);
        
        result = {
            status: HttpStatus.OK,
            message: 'fetch_publisher',
            data: queryResult
          };
        } catch (e) {
          result = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'internal server error',
            data: null,
          };
        }

      return result;
  }


  @MessagePattern({cmd: 'DELETE_GAME_BY_ID'})
  public async deleteGameById(gameId): Promise<IFetchGameResponse> {
    let result: IFetchGameResponse;

      try {
        const queryResult = await this.gameService.deleteGame(gameId);
        console.log(queryResult)

        
        result = {
          status: HttpStatus.OK,
          message: 'game_deleted',
          game: queryResult
        };
       
      } catch (e) {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'not_found',
          game: null,
          errors: e.message
        };
      }

      return result;
  }

  @MessagePattern({cmd: 'FLUSH_GAME'})
  public async flushGames(): Promise<IFetchGameResponse> {
    let result: IFetchGameResponse;

      try {
        
        await this.gameService.flushGames();

        result = {
          status: HttpStatus.OK,
          message: 'games_deleted',
          game: null
        };
       
      } catch (e) {
        result = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'internal_server_error',
          game: null,
          errors: e.message
        };
      }

      return result;
  }

  @MessagePattern({cmd: 'APPLY_DISCOUNT'})
  public async applyDiscount(): Promise<IFetchGameResponse> {
    let result: IFetchGameResponse;

      try {
        await this.gameService.applyDiscount(12, 18, 20);

        result = {
          status: HttpStatus.OK,
          message: 'discount_applied',
          game: null
        };
       
      } catch (e) {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'not_found',
          game: null,
          errors: e.message
        };
      }

      return result;
  }
}   
