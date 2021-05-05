import { IGame } from "../game.interface";
import { IPublisher } from "../publisher.interface";

export interface GetGamesResponseDto {
    message: string;
    data: {
      games: IGame[];
    };
    errors: { [key: string]: any };
  }

  export interface GetGameResponseDto {
    message: string;
    data: {
      game: IGame;
    };
    errors: { [key: string]: any };
  }

  export interface CreateGameResponseDto {
    message: string;
    data: {
      games: IGame;
    };
    errors: { [key: string]: any };
  }

  export interface GetGamePublisherResponseDto {
    message: string;
    data: {
      publisher: IPublisher;
    };
    errors: { [key: string]: any };
  }

  export interface DeleteGameResponseDto {
    message: string;
    data: {
      games: IGame[];
    };
    errors: { [key: string]: any };
  }

  export interface ApplyDiscountResponseDto {
    message: string;
    data: {
      games: IGame[];
    };
    errors: { [key: string]: any };
  }

  export interface FlushGameResponseDto  {
    message: string;
    data: {
      games: IGame[];
    };
    errors: { [key: string]: any };
  }