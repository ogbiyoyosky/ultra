
import { Document } from 'mongoose';


export interface IPublisher {
    name: string;
    siret: number;
    phone: string;
}

export type PublisherDocument = IPublisher & Document;
