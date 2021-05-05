import { IPublisher } from "src/publisher/publisher.interface";

export interface IFetchPublisherResponse {
    status: number;
    message: string;
    publisher: IPublisher;
}

