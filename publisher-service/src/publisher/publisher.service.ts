import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types} from 'mongoose';
import { PublisherDocument, IPublisher} from './publisher.interface';

@Injectable()
export class PublisherService {
    constructor(@InjectModel('Publisher') private readonly publisherModel: Model<PublisherDocument>, 
   ) {}

    /**
     * @method create - create new game
     * @param createGameDto - create a game entry in the 
     * @returns game
     */
    async create(createPublisherDto: IPublisher): Promise<IPublisher> {
        const createdPublisher = new this.publisherModel(createPublisherDto);
        return createdPublisher.save();
    }

    /**
     * @method findOne - findone game
     * @param id - id of the game
     * @returns 
     */
    public async findOne(id: string): Promise<IPublisher> {

        if(!Types.ObjectId.isValid(id)){
            throw new NotFoundException(`Publisher with the id - ${id} not found`)
        }
        const filter = { _id : id}
        const publisher = await this.publisherModel.findOne(filter)

        if(!publisher) {
            throw new NotFoundException(`Game with the id - ${id} not found`)
        }
        return publisher;
    }

}
