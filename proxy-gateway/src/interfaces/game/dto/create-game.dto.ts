import { IGame } from "../game.interface";

export interface CreateGameResponseDto {
    message: string;
    data: {
      games: IGame;
    };
    errors: { [key: string]: any };
  }