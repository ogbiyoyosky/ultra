
import { Document } from 'mongoose';


export interface IGame {
    id?: string;
    title: string;
    price: number;
    publisher: string;
    tags: string[];
    releaseDate: Date;
    createdAt?: Date;
}

export type GameDocument = IGame & Document;
