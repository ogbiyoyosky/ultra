import { IGame } from "src/game/game.interface";

export interface ICreateGameResponse {
    status: number;
    message: string;
    game: IGame;
}

export interface IUpdateGameResponse {
    status: number;
    message: string;
    game: IGame;
}

export interface IFetchGamesResponse {
    status: number;
    message: string;
    games: IGame[];
}

export interface IFetchGameResponse {
    status: number;
    message: string;
    game: IGame;
    errors?: any;
}

export interface IDeleteGameResponse {
    status: number;
    message: string;
    game: IGame;
    errors?: any;
}