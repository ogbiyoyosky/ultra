import { IGame } from "./game.interface";
import { IPublisher } from "./publisher.interface";

export interface IServiceGetGamesResponse {
    status: number;
    message: string;
    games: IGame[];
    errors?: any;
}

export interface IServiceGetGamePublisherResponse {
  status: number;
  message: string;
  data: any;
  errors?: any
}

export interface IServiceGetGameResponse {
  status: number;
  message: string;
  game: IGame;
  errors?: any
}

export interface IServiceCreateGameResponse {
  status: number;
  message: string;
  game: IGame;
  errors?: any
}

export interface IServiceDeleteGameResponse {
  status: number;
  message: string;
  game: null;
  errors?: any
}

export interface IServiceApplyDiscount {
  status: number;
  message: string;
  data: null;
  errors?: any
}

export interface IServiceFlushGame {
  status: number;
  message: string;
  data: null;
  errors?: any
}